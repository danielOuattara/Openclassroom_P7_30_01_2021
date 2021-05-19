
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
            res.status(200).json("User was registered successfully!" ) 
        }
    }
    catch(err){
        return res.status(400).json(err.message)
    }
}

// exports.signin = (req, res) => {
//     bcrypt.hash(req.body.password, 11)
//     .then( hash => {
//         User.create( {        
//           email: req.body.email,
//           password: hash
//         })
//         .then(user => {
//           if (req.body.roles) {
//             Role.findAll({
//               where: {
//                 name: { [Op.or]: req.body.roles }
//               }
//             })
//             .then(roles => {
//                 user.setRoles(roles)
//                 .then(() =>  res.status(201).json({ message: "User was registered successfully!" }) )
//                 .catch( error =>  res.status(400).json( {error}) )
//             })
//             .catch( error =>  res.status(400).json( {error}) );

//           } else {
//             // user role = 1
//             user.setRoles([1])
//             .then( () =>  res.status(201).json({ message: "User was registered successfully!" }) ) 
//             .catch( error =>  res.status(400).json( {error}) )
//           }
//         })
//         .catch(err => { res.status(400).send({ message: err.message }) });
//     })
//     .catch(error => res.status(400).json( {message: error.message}))
// }

// -----------------------------------------------------------------------------------

exports.login = async (req, res) => {

    try {
        const user = await User.findOne({ 
            where: { [Op.or]: [
                        {username: req.body.emailOrUsername}, 
                        {email: req.body.emailOrUsername} 
                ] 
            }
        })
        if(!user)  {
            // throw ("Error: Login failed ! Try again !");
            return res.status(401).send({ message: "Error: Login failed ! Try again !"});
        }
        const validPassword = await bcrypt.compare( req.body.password, user.password);
        if(!validPassword) {
            // throw ("Error: Login failed ! Try again !");
            return res.status(401).json("Error: Login failed ! Try again !");
        }
        const authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(201).send({
            accessToken: jwt.sign(
                {
                    uuid: user.uuid,
                    id: user.id,
                    userRoles: [...authorities]
                },
                config.secret,
                {expiresIn: '5h'}
            )
        });
    } catch(err) {
        return res.status(401).json(err.message);
        }
    }

// exports.login = (req, res) => {
//    
//     User.findOne({ 
//         where: { 
//             [Op.or]: [
//                 {username: req.body.emailOrUsername}, 
//                 {email: req.body.emailOrUsername} 
//             ] 
//         }
//     })
//     .then( user => {
//         if(!user) return res.status(401).send({ message: "Error: Type again your login credentials !"});

//         const passwordIsValid = bcrypt.compareSync( req.body.password, user.password);
//         if(!passwordIsValid) return res.status(401).send({ message: "Error: Type again your login credentials !"});

//         const authorities = [];
//         user.getRoles()
//         .then( roles => {
//             for (let i = 0; i < roles.length; i++) {
//                 authorities.push("ROLE_" + roles[i].name.toUpperCase());
//             }
//             res.status(201).send({
//                 accessToken: jwt.sign(
//                     {
//                         uuid: user.uuid,
//                         id: user.id,
//                         userRoles: [...authorities]
//                     },
//                     config.secret,
//                     {expiresIn: '5h'}
//                 )
//             });
//         })
//         .catch( err => res.status(500).send({ message: err.message }) );
//     })
//     .catch( err => res.status(500).send({ message: err.message }) );
// }

//-------------------------------------------------------------------------------------------------

exports.signout = async (req, res) => { 

    try {
        const user = await User.findOne({ where: { uuid: req.params.userUuid } })
        if(!user){
            return res.status(404).json(" Error : User unknown !")  
            // throw new Error(" Error : User unknown !");  
        }
        if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
            return res.status(403).json( {error: "Unauthorized !" } )  
            // throw ("Unauthorized !");  
        }
        await user.destroy()
        res.status(200).json({ message: "Account successfully deleted !" })

    } catch(err){
        return res.status(403).json(err.message)
    }
}

// exports.signout = (req, res) => { 
    
//     User.findOne({ where: { uuid: req.params.userUuid } })
//     .then( user => {
//         if(user.id !== req.userId && !req.userRoles.includes("ROLE_ADMIN")){
//             return res.status(403).json( {error: "Unauthorize !" } )  
//         }
//         user.destroy()
//         .then(() => res.status(200).json({ message: "Account successfully deleted !" }))
//         .catch((error) => res.status(403).json({ error: error.message }));
//     })
//     .catch( error => res.status(500).json( {error: error.message} )) 
// }

//-------------------------------------------------------------------------------------------------



