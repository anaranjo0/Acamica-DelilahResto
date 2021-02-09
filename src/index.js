require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Database models definition and connection
require("./database/models/item");
require("./database/models/user");
require("./database/models/order");

//Settings
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running on port ", port);
});

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routers
const menuRouter = require("./routes/menu");
const signUpRouter = require("./routes/sign-up");
const logInRouter = require("./routes/log-in");
const ordersRouter = require("./routes/orders/orders");

//Routes
app.use("/menu", menuRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/orders", ordersRouter);

