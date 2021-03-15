const dbConfiguration = require('../config/db.config');



dbConfiguration.template = require('./template')(dbConfiguration.sequelize, dbConfiguration.Sequelize);
dbConfiguration.user = require('./user')(dbConfiguration.sequelize, dbConfiguration.Sequelize);

module.exports = dbConfiguration;