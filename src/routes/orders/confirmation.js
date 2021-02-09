const orderConfirmRouter = require("express").Router();
const confirmationCtlr = require("../../controllers/confirmationCtlr");

const { verifyToken } = require("../../middlewares");

//confirmacion del pedido
orderConfirmRouter.get("/:userId/:orderId", verifyToken, confirmationCtlr.read);

module.exports = orderConfirmRouter;