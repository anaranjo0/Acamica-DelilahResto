const ordersRouter = require("express").Router();
const orderConfirmRouter = require("./confirmation");
const orderTrackRouter = require("./tracking");

const { verifyToken, roleAuthentication } = require("../../middlewares");
const ordersCtlr = require("../../controllers/ordersCtlr");

ordersRouter.use("/confirmation", orderConfirmRouter);
ordersRouter.use("/tracking", orderTrackRouter);

//ver todos los pedidos de todos los usuarios (ADMIN)
ordersRouter.get("/", verifyToken, roleAuthentication, ordersCtlr.readManyFromMany);
//ver todos los pedidos de un usuario (usuario y ADMIN)
ordersRouter.get("/:userId", verifyToken, ordersCtlr.readManyFromOne);
//ver 1 pedido de un usuario (usuario y ADMIN)
ordersRouter.get("/:userId/:orderId", verifyToken, ordersCtlr.read);
//agregar un pedido (usuario y ADMIN)
ordersRouter.post("/:userId", verifyToken, ordersCtlr.create);
//editar un pedido (ADMIN)
ordersRouter.put("/:userId/:orderId", verifyToken, roleAuthentication, ordersCtlr.update);
//borrar un pedido (ADMIN)
ordersRouter.delete("/:userId/:orderId", verifyToken, roleAuthentication, ordersCtlr.delete);

module.exports = ordersRouter;
