const menuRouter = require("express").Router();
const { verifyToken, roleAuthentication } = require("../middlewares");

const menuCtlr=require('../controllers/menuCtlr');

//ver todos los platos del menu (usuario y ADMIN)
menuRouter.get("/", verifyToken, menuCtlr.readMany);
//ver un plato del menu (usuario y ADMIN)
menuRouter.get("/:id", verifyToken, menuCtlr.read);
//agregar un plato al menu(ADMIN)
menuRouter.post("/", verifyToken, roleAuthentication, menuCtlr.create);
//modificar un plato del menu(ADMIN)
menuRouter.put("/:id", verifyToken, roleAuthentication, menuCtlr.update);
//borrar un plato del menu(ADMIN)
menuRouter.delete("/:id", verifyToken, roleAuthentication, menuCtlr.delete);

module.exports = menuRouter;