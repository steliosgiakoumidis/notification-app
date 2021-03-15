module.exports = (app) => {
    const templates = require("../controllers/template.js");
    const sendouts = require("../controllers/sendout.js");
    const users = require("../controllers/user.js")

    var router = require('express').Router();

    router.route("/templates")
        .post(templates.create)
        .get(templates.getall)
        .put(templates.update)

    router.route("/users")
        .post(users.create)
        .get(users.getall)
        .put(users.update)

    router.route("/sendout")
        .post(sendouts.send)

    app.use('/api', router);
}
