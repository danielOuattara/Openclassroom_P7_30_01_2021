
module.exports = ( sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {

        content: {
            type: Sequelize.STRING,
        },

        owner_id: {  // ??
            type: Sequelize.INTEGER,
            allowNull: false
        },

        photo_id: {  // ??
            type: Sequelize.INTEGER,
            allowNull: false
        },

        userId_like: {
            type: Sequelize.INTEGER,
        },

        userId_dislike: {
            type: Sequelize.INTEGER,
        },

    });

    return Comment;
};
