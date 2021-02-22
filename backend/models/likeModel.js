
module.exports = ( sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {

        // owner_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },

        photo_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        comment_id: {
            type: Sequelize.INTEGER?
            allowNull: false
        },

        likes: {
            type: Sequelize.ARRAY,
            value: []
        },
        dislikes: {
            type: Sequelize.ARRAY,
            value: []
        },
    });

    return Like;
};

