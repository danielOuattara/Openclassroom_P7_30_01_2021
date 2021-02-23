
module.exports = ( sequelize, Sequelize) => {
    const Comment = sequelize.define("commentsPhoto", {

        content: {
            type: Sequelize.STRING,
        },

        comment_owner_id: {  // ??
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },

    });

    return Comment;
};
