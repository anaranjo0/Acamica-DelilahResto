const sequelize = require("../dbConnection");

sequelize.authenticate().then(async()=>{
  const user = "CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER UNSIGNED AUTO_INCREMENT,`user` VARCHAR(60) NOT NULL,`password` VARCHAR(60) NOT NULL,`full_name` VARCHAR(60) NOT NULL,`email` VARCHAR(60) NOT NULL UNIQUE,`phone` VARCHAR(10) NOT NULL,`address` VARCHAR(60) NOT NULL, `role` VARCHAR(1) NOT NULL DEFAULT" + `'${process.env.BASIC_ROLE}',` + "PRIMARY KEY (`id`));";
  await sequelize.query(user, {raw:true});
});