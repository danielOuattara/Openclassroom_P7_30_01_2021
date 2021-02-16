
module.exports = ( sequelize, Sequelize) => {
    const Photo = sequelize.define("photos", {

        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        url: {
            type: Sequelize.STRING,
            allowNull: false
        },

        photoPostDate: {
            type: Sequelize.DATE
        }
    });

    return Photo;
};

