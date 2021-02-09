const sequelize = require("../database/dbConnection");
const bcrypt = require("bcrypt");

signUpCtlr = {};

signUpCtlr.read = (req, res) => {
  res.send(
    "Para poder registrarte envia los siguientes datos\n\nuser:\npassword:\nfull_name:\nemail:\nphone:\naddress:"
  );
};

signUpCtlr.create = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  try {
    await sequelize.authenticate().then(async () => {
      const query =
        "INSERT INTO `users` (user, password, full_name, email, phone, address) VALUES (" +
        `'${req.body.user}',` +
        `'${req.body.password}',` +
        `'${req.body.full_name}',` +
        `'${req.body.email}',` +
        `'${req.body.phone}',` +
        `'${req.body.address}'` +
        ");";
      await sequelize.query(query, { raw: true });
      res.redirect("log-in");
    });
  } catch (err) {
    res.json("error: " + err.errors[0].message);
  }
};

module.exports = signUpCtlr;
