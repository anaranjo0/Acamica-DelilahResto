const sequelize = require("../database/dbConnection");
const jwt = require("jsonwebtoken");
const { orderProcessing } = require("../helpers");

ordersCtlr = {};

ordersCtlr.readManyFromMany = (req, res) => {
  try {
    sequelize.authenticate().then(async () => {
      const query =
        "SELECT `orders`.`state`,`orders`.`id`,`orders`.`detail`,`orders`.`total`,`orders`.`payment_method`, `users`.`user`, `users`.`address` FROM `orders` JOIN `users` ON `orders`.`user_id`=`users`.`id` ORDER BY `orders`.`id` DESC;";
      const [results] = await sequelize.query(query, { raw: true });
      res.send(results);
    });
  } catch (err) {
    res.json(err);
  }
};

ordersCtlr.readManyFromOne = (req, res) => {
  try {
    const { userMatch } = jwt.decode(req.headers.authorization.split(" ")[1]);
    if (
      parseInt(req.params.userId) === userMatch.id ||
      userMatch.role === process.env.ADMIN_ROLE
    ) {
      sequelize.authenticate().then(async () => {
        const query =
          "SELECT `orders`.`state`, `orders`.`id`,`orders`.`detail`,`orders`.`total`,`orders`.`payment_method`,`users`.`user`,`users`.`address` FROM `orders` JOIN `users` ON `orders`.`user_id`=`users`.`id` WHERE `orders`.`user_id`=" +
          `'${req.params.userId}'` +
          " ORDER BY `orders`.`id` DESC;";
        const [results] = await sequelize.query(query, { raw: true });
        res.send(results);
      });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.json(err);
  }
};

ordersCtlr.read = (req, res) => {
  try {
    const { userMatch } = jwt.decode(req.headers.authorization.split(" ")[1]);
    if (
      parseInt(req.params.userId) === userMatch.id ||
      userMatch.role === process.env.ADMIN_ROLE
    ) {
      sequelize.authenticate().then(async () => {
        const query =
          "SELECT `orders`.`detail`, `orders`.`total`, `orders`.`state`, `orders`.`payment_method`, `users`.`address`, `users`.`full_name`, `users`.`user`, `users`.`email`, `users`.`phone` FROM `orders` JOIN `users` ON `orders`.`user_id`=`users`.`id` WHERE `orders`.`user_id`=" +
          `'${req.params.userId}'` +
          " AND `orders`.`id`=" +
          `'${req.params.orderId}';`;
        const [results] = await sequelize.query(query, { raw: true });
        res.send(results);
      });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.json(err);
  }
};

ordersCtlr.create = async (req, res) => {
  try {
    const { userMatch } = jwt.decode(req.headers.authorization.split(" ")[1]);
    
    if (
      parseInt(req.params.userId) === userMatch.id ||
      userMatch.role === process.env.ADMIN_ROLE
    ) {
      const order = await orderProcessing(req.body);
      sequelize.authenticate().then(async () => {
        const query =
          "INSERT INTO `orders` (`detail`, `total`, `payment_method`, `user_id`) VALUES (" +
          `'${order.detail}',` +
          `'${order.total}',` +
          `'${order.paymentMethod}',` +
          `${req.params.userId});`;
        const [resultados] = await sequelize.query(query, { raw: true });
        res.redirect(
          `confirmation/${req.params.userId}/${resultados}`
        );
      });
    }
  } catch (err) {
    res.json(err);
  }
};

ordersCtlr.update = (req, res) => {
  try {
    sequelize.authenticate().then(async () => {
      const query =
        "UPDATE `orders` SET `state`=" +
        `'${req.body.state}'` +
        " WHERE `orders`.`id`=" +
        `'${req.params.orderId}'` +
        " AND `orders`.`user_id`=" +
        `'${req.params.userId}';`;
      await sequelize.query(query, { raw: true });
      res.redirect(`/orders/${req.params.userId}/${req.params.orderId}`);
    });
  } catch (err) {
    res.json(err);
  }
};

ordersCtlr.delete = (req, res) => {
  try {
    sequelize.authenticate().then(async () => {
      const query =
        "SELECT * FROM `orders` WHERE `orders`.`id`=" +
        `'${req.params.orderId}'` +
        " AND `orders`.`user_id`=" +
        `'${req.params.userId}';`;
      const [results] = await sequelize.query(query, { raw: true });
      if (results.length > 0) {
        const query =
          "DELETE FROM `orders` WHERE `orders`.`id`=" +
          `'${req.params.orderId}'` +
          " AND `orders`.`user_id`=" +
          `'${req.params.userId}';`;
        await sequelize.query(query, { raw: true });
        res.redirect(`/orders/${req.params.userId}`);
      } else {
        res.sendStatus(404);
      }
    });
  } catch (err) {
    res.sendStatus(404);
  }
};

module.exports = ordersCtlr;
