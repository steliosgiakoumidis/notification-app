module.exports = (sequelize, Sequelize) => {
    const Template = sequelize.define("template", {
        name: {
            type: Sequelize.STRING
        },
        communicationType: {
            type: Sequelize.STRING
        },
        subject: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        }}, 
        {
            tableName: 'templates'
        });

        return Template;   
    };