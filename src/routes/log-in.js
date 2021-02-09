const logInRouter = require("express").Router();

const loginCtlr = require("../controllers/log-inCtlr");

//login page
logInRouter.get("/", loginCtlr.read);

//autenticar usuario con email y contraseña
logInRouter.post("/", loginCtlr.create);

module.exports = logInRouter;
