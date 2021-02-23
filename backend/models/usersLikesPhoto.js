

module.exports = (sequelize, Sequelize) => {
    const UsersLikes = sequelize.define("usersLikes", {

        userLikes: {
          type: Sequelize.INTEGER(1),
        },

        userDislikes: {
          type: Sequelize.INTEGER(1),
        },

        likes_owner_id: {  // ??
          type: Sequelize.INTEGER,
          allowNull: false
        },

});
  
    return UsersLikes;
  };



  