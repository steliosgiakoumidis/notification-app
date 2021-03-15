const db = require('../models');
const validator = require('../validators/template');
const Template = db.template;

exports.create = (req, res, next) => {
    try {
        console.log("New create request");
        const {name, subject, communicationType, content} = req.body;

        if(!validator.Template(name, communicationType, content)){
            res.status(400).send({message: "Invalid object"});
        }
    
        const template = {
            name: name,
            communicationType: communicationType,
            content: content,
            subject: subject
        }
    
        Template.create(template)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Internal server error"
                });
            });
    } catch (err) {
        next(err);
    }
    
}

exports.getall = async (req, res, next) => {
    
    try {
        let aa = await db.sequelize.query('SELECT * FROM templates', {
            type: db.sequelize.QueryTypes.SELECT
             });
        res.send(aa);
    } catch (error) {
        next(error)
    }
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const reqName = req.body.name;
  
    Template.update(req.body, {
      where: { name: reqName }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Template was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with reqName=${reqName}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with reqName=" + reqName
        });
      });
 
};