const jwt = require("jsonwebtoken");

//verifica TOKEN
const verifyToken = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_JWT);
    return next();
  } catch (err) {
    res.redirect("log-in");
  }
};

//verifica el rol del usuario (ADMIN o usuario)
function roleAuthentication(req, res, next) {
  const { userMatch } = jwt.decode(req.headers.authorization.split(" ")[1]);
  if (userMatch && userMatch.role === process.env.ADMIN_ROLE) return next();
  res.sendStatus(403);
}

module.exports = { verifyToken, roleAuthentication };
