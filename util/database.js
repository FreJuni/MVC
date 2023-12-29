// const mysql = require("mysql2");       Using mysql2

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "sqld",
//   password: "",
// });

// module.exports = pool.promise();

const Sequelize = require("sequelize"); //  Using sequelize

const sequelize = new Sequelize("sqld", "root", "{tJ%zB4Wm@", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
