const jwt = require("jsonwebtoken");

confirmationCtlr = {};

confirmationCtlr.read = async (req, res) => {
  try {
    const { userMatch } = jwt.decode(req.headers.authorization.split(" ")[1]);
    if (
      parseInt(req.params.userId) === userMatch.id ||
      userMatch.role === process.env.ADMIN_ROLE
    ) {
      res.send(
        `¡Recibimos tu pedido!\n ${userMatch.user}, gracias por pedir en 'Delilah Resto' \npuedes seguir tu pedido en:\n\n /orders/tracking/${req.params.userId}/${req.params.orderId}`);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(403);
  }
};

module.exports = confirmationCtlr;