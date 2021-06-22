'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('photos', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,  
      },
    
      title: {
        type: Sequelize.STRING(90),
        allowNull: false,
        required: true,
        validate: {
          notEmpty: { msg: "Title cannot be empty"},
          not: /[\[\]<>=0]+/gi  //  Restriction from  using characters:  [ \ [ \ ] < > = 0 ]
        },
      },

      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        validate: {
          notEmpty: { msg: "iamgeUrl can not be empty"},
          againstInjection(imageUrl) {
            const pattern =  /[\[\]<>=0]+/gi;  // do not trust user input !
            if ( pattern.test(imageUrl) ) throw new Error("Fill in text Invalid !");  //  Restriction from  using characters:  [ \ [ \ ] < > = 0 ]
          },
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      // ownerId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'User',
      //     key: 'id'
      //   },
      //   // onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      // }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('photos');
  }
};