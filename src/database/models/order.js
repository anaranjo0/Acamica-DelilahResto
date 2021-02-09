const sequelize = require("../dbConnection");

sequelize.authenticate().then(async () => {
  const order = "CREATE TABLE IF NOT EXISTS `orders` (`id` INTEGER AUTO_INCREMENT NOT NULL, `state` VARCHAR(60) DEFAULT 'recibido correctamente',`detail` VARCHAR(1000) NOT NULL,`total` INTEGER NOT NULL,`payment_method` VARCHAR(60) NOT NULL,`user_id` INTEGER NOT NULL, PRIMARY KEY (`id`));";
  await sequelize.query(order, { raw: true});
});

