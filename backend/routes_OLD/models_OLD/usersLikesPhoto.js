

module.exports = (sequelize, Sequelize) => {
    const UsersLikes = sequelize.define("usersLikes", {

        userLikes: {
          type: Sequelize.INTEGER(1).UNSIGNED,
        },

        userDislikes: {
          type: Sequelize.INTEGER(1).UNSIGNED,
        },

        likes_owner_id: {  // ??
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },

});
  
    return UsersLikes;
  };



  