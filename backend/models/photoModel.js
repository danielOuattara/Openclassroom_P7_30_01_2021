
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

        owner_id: {
            type: Sequelize.INTEGER,
        },

        userId_like: {
            type: Sequelize.INTEGER,
        },

        userId_dislike: {
            type: Sequelize.INTEGER,
        },

    });

    return Photo;
};

