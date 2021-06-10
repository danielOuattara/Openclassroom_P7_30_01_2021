
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
                userRoles: [...authorities],
            },
            config.secret,
            {expiresIn:'12h'}
        )
        res.status(201).json({ 
            accessToken: token, 
            uuid:  user.uuid,
            roles: authorities,
            // limit: 500,
        });
    } catch(err) {
        return res.status(401).send(err.message);
    }
}

//-------------------------------------------------------------------------------------------------

exports.logout = (req, res) => {}  // TODO


//-------------------------------------------------------------------------------------------------

exports.signout = async (req, res) => { 
    console.log(req);
    try {
        const user = await User.findOne({ where: { uuid: req.params.userUuid } })
        if (!user) {
            return res.status(404).send("User unknown!");
        }
        else if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
            return res.status(403).send("Non Authorized !")  
        }
        
        const passwordConfirm = await bcrypt.compare(req.body.password, user.password);
        if(!passwordConfirm) {
            return res.status(403).send("Non Authorized !")  
        }
        await user.destroy()
            .then(() => res.status(200).send("Account successfully deleted !"))
        }
    catch(err){ 
        return res.status(500).send(err.message)}

}

//-------------------------------------------------------------------------------------------------

exports.updatePassword =  async(req, res) => { 
    try {
        const user = await User.findOne({ where: { uuid: req.params.userUuid } })
        if (!user) {
            return res.status(404).send("User unknown!");
        }
        else if(user.id !== req.userId){
            return res.status(403).send("Non Authorized !")  
        }
        const passwordOld = await bcrypt.compare( req.body.passwordOld, user.password);
        if(!passwordOld) {
            return res.status(403).send(" Non Unauthorized !");
        }
        const newPassword = await bcrypt.hash(req.body.password, 11);
        await user.update({ password: newPassword})
        return res.status(200).send("Password successfully updated !")
    }catch(err) {
        return res.status(500).send(err.message)
    } 
}

//-------------------------------------------------------------------------------------------------


