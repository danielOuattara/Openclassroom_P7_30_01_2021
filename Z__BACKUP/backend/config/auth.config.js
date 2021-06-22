require('dotenv').config();

module.exports = {
    secret: process.env.SECRET_KEY,
    specialRolePassword: process.env.SPECIAL_ROLE_PASSWORD,
};