const signUpRouter = require("express").Router();

const signUpCtlr=require('../controllers/sign-upCtlr')

//signup page
signUpRouter.get("/", signUpCtlr.read);

//registrar usuario (no es posible registrar usuario con permisos ADMIN)
signUpRouter.post("/", signUpCtlr.create);

module.exports = signUpRouter;