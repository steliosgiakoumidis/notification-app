module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
            type: Sequelize.STRING
        },
        userName: {
            type: Sequelize.STRING
        },
        communicationPreference: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }}, 
            {
                tableName: 'users'
            }
        );

        return User;
    };