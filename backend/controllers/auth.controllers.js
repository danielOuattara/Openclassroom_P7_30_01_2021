
const bcrypt = require("bcryptjs");
const config = require("./../config/auth.config.js");
const db = require("./../models");
const { User, Role } = require('./../models');
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

//--------------------------------------------------------------------------

exports.signin =  async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 11);
        const user = await User.create({ email: req.body.email, password: hash })
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: { [Op.or]: req.body.roles }
                }
            });
            await user.setRoles(roles);
            res.status(200).send("User registered successfully!")  
        } else {
            await user.setRoles([1])
            res.status(200).send("User registered successfully!") 
        }
    }
    catch(err){
        return res.status(400).send(err.message)
    }
}

// -----------------------------------------------------------------------------------

exports.login = async (req, res) => {
    try {
        if (!req.body.emailOrUsername) {
            return res.status(400).send("Provide email OR username");
        }
        const user = await User.findOne({ 
            where: { [Op.or]: [
                        {username: req.body.emailOrUsername}, 
                        {email: req.body.emailOrUsername} 
                ] 
            }
        })
        if(!user)  {
            return res.status(401).send("Login failed, try again !");
        }
        const validPassword = await bcrypt.compare( req.body.password, user.password);
        if(!validPassword) {
            return res.status(401).send("Login failed, try again !");
        }
        const authorities = [];
        const roles = await user.getRoles();
        for (const role of roles) {
            authorities.push("ROLE_" + role.name.toUpperCase());
        }
        const token = jwt.sign(
            {
                uuid: user.uuid,
                id: user.id,
                userRoles: [...authorities]
            },
            config.secret,
            {expiresIn: '12h'}
        )
        res.status(201).json({ 
            accessToken: token, 
            uuid:  user.uuid
        });
        } 
    catch(err) {
        return res.status(401).send(err.message);
    }
}

//-------------------------------------------------------------------------------------------------

exports.logout = (req, res) => {}  // TODO


//-------------------------------------------------------------------------------------------------

exports.signout = (req, res) => { 
    console.log(req);
    
    User.findOne({ where: { uuid: req.params.userUuid } })
    .then( user => {
        if (!user) {
             return res.status(404).send("User unknown!");
        }
        if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
           return res.status(403).send("Non Authorized !")  
        }
        user.destroy()
        .then(() => res.status(200).send("Account successfully deleted !"))
        .catch((error) => res.status(404).send(error.message));
    })
    .catch( error => res.status(500).send(error.message)) 
}

//-------------------------------------------------------------------------------------------------


