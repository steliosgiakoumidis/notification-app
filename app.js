const express = require('express');
const cors = require('cors');

const app = express();

var corsOption = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOption));

app.use(express.json());

const dbConfigurations = require('./models');
dbConfigurations.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

  var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
  }
  
  app.use(myLogger)
require("./routes/template.routes")(app);


  const PORT = 8080;
  app.listen(PORT, () => {
    console.log("Server is up and running on port " + PORT)
})