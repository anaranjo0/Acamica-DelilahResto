const sequelize = require("../dbConnection");

sequelize.authenticate().then(async () => {
  const item = "CREATE TABLE IF NOT EXISTS `items` (`id` INTEGER AUTO_INCREMENT, `description` VARCHAR(255) NOT NULL, `price` DOUBLE NOT NULL, `photo` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`));";
  await sequelize.query(item, { raw: true });
});

