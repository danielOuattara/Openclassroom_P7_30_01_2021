
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
            res.status(200).json("User was registered successfully!")  
        } else {
            await user.setRoles([1])
            res.status(200).json("User was registered successfully!") 
        }
    }
    catch(err){
        return res.status(400).json({ Error : err.message})
    }
}

// -----------------------------------------------------------------------------------

exports.login = async (req, res) => {
    try {
        if (!req.body.emailOrUsername) {
            return res.status(400).json("Error : Provide email OR username");
        }
        const user = await User.findOne({ 
            where: { [Op.or]: [
                        {username: req.body.emailOrUsername}, 
                        {email: req.body.emailOrUsername} 
                ] 
            }
        })
        if(!user)  {
            return res.status(401).json("Login failed, try again !");
        }
        const validPassword = await bcrypt.compare( req.body.password, user.password);
        if(!validPassword) {
            return res.status(401).json("Login failed, try again !");
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
        res.status(201).json({ accessToken: token });
        } 
    catch(err) {
        return res.status(401).json(err.message);
    }
}

//-------------------------------------------------------------------------------------------------

exports.signout = (req, res) => { 
    
    User.findOne({ where: { uuid: req.params.userUuid } })
    .then( user => {
        if (!user) {
             return res.status(404).json({ Error: "User unknown!"});
      }
        user.destroy()
        .then(() => res.status(200).json("Account successfully deleted !"))
        .catch((error) => res.status(403).json({ Error: error.message }));
    })
    .catch( error => res.status(500).json( { Error: error.message} )) 
}

//-------------------------------------------------------------------------------------------------

exports.logout = (req, res) => {}

