
module.exports = ( sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {

        content: {
            type: Sequelize.STRING,
            allowNull: true
        },

        // owner_id: {  // ??
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // }

        // photo_id: {  // ??
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // }
    });

    return Comment;
};
