const signUpRouter = require("express").Router();
const { verifyToken, roleAuthentication } = require("../middlewares");

const signUpCtlr=require('../controllers/sign-upCtlr')
//sugnup read
signUpRouter.get("/", signUpCtlr.read);

//signup page
signUpRouter.get("/:id", verifyToken, roleAuthentication, signUpCtlr.readsingle);

//registrar usuario (no es posible registrar usuario con permisos ADMIN)
signUpRouter.post("/", signUpCtlr.create);

module.exports = signUpRouter;