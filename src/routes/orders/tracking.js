const orderTrackRouter = require("express").Router();
const { verifyToken } = require("../../middlewares");

const trackingCtlr=require('../../controllers/trackingCtlr');

//seguimiento del pedido
orderTrackRouter.get("/:userId/:orderId", verifyToken, trackingCtlr.read);

module.exports = orderTrackRouter;
