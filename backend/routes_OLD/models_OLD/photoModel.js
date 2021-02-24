
module.exports = ( sequelize, Sequelize) => {
    const Photo = sequelize.define("photos", {

        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },

    });

    return Photo;
};

