const jwt = require("jsonwebtoken");
const { dbMatch } = require("../helpers");

trackingCtlr = {};

trackingCtlr.read = async (req, res) => {
  try {
    const { userMatch } = jwt.decode(req.headers.authorization.split(" ")[1]);
    if (
      parseInt(req.params.userId) === userMatch.id ||
      userMatch.role === process.env.ADMIN_ROLE
    ) {
      const [order] = await dbMatch("orders", "id", req.params.orderId);
      if (order) {
        res.send("El estado del pedido es:\n\n" + order.state);
      } else {
        res.send(404);
      }
    }
  } catch {
    res.sendStatus(403);
  }
};

module.exports = trackingCtlr;
