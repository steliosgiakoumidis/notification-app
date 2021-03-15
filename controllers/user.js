const db = require('../models');
const validator = require('../validators/user');
const User = db.user;

exports.create = (req, res, next) => {
    try {
        console.log("New create request");

        const {userId, userName, communicationPreference, mobile, email} = req.body;
        
        if(!validator.User(userId, userName, communicationPreference, mobile, email)){
            res.status(400).send({message: "The user object is not invalid"});
        };
    
        const user = {
            userId: userId,
            userName: userName,
            communicationPreference: communicationPreference,
            mobile: mobile,
            email: email
        }
    
        User.create(user)
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
        let allUsers = await db.sequelize.query('SELECT * FROM users', {
            type: db.sequelize.QueryTypes.SELECT
             });
        res.send(allUsers);
    } catch (error) {
        next(error)
    }
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const reqUserId = req.body.userId;
  
    Template.update(req.body, {
      where: { userId: reqUserId }
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