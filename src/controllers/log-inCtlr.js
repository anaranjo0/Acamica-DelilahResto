const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { dbMatch } = require("../helpers");

logInCtlr = {};

logInCtlr.read = (req, res) => {
  res.send(
    "Estás en el endpoint '/login', para autenticarte debes ingresar:\n\n email:\n password:"
  );
};

logInCtlr.create = async (req, res) => {
  try{
    const [userMatch] = await dbMatch("users", "email", req.body.email)
      if (userMatch.email && await bcrypt.compare(req.body.password, userMatch.password)) {
        const token = jwt.sign({ userMatch }, process.env.TOKEN_JWT);     
        res.send(`token: ${token}\n\n El 'id' del usuario es: ${userMatch.id}`)
      } else {
        res.send("contraseña incorrecta, por favor ingresa los datos nuevamente");
      }
  } catch {
    res.send("usuario no registrado, por favor regístrese y luego ingrese");
  }
}


module.exports = logInCtlr;