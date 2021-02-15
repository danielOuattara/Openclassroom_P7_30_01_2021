
module.exports = ( sequelize, Sequelize) => {
    const User = sequelize.define("users", {

        firstName: {
            type: Sequelize.STRING
        },

        lastName: {
            type: Sequelize.STRING
        },

        gender: {
            type: Sequelize.STRING(1)
        },

        age: {
            type: Sequelize.INTEGER
        },

        departement: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            isEmail: true,
        },

        pswd: {
            type: Sequelize.STRING,
            allowNull: false
        },

        accountCreationDate: {
            type: Sequelize.DATE
        }
    });

    return User;
};

/*
After initializing Sequelize, we don’t need to write CRUD functions, Sequelize supports all of them:

    > create a new Tutorial: create(object)
    > find a Tutorial by id: findByPk(id)
    > get all Tutorials: findAll()
    > update a Tutorial by id: update(data, where: { id: id })
    > remove a Tutorial: destroy(where: { id: id })
    > remove all Tutorials: destroy(where: {})
    > find all Tutorials by title: findAll({ where: { title: ... } })

These functions will be used in our Controller.*/