const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
      insecureAuth: true,
    },
    //logging: console.log,
    define: {
      charset: "utf8mb4",
    },
  }
);
// -- just creating task_aviansoft schema in mysql local database
var mysql = require("mysql2/promise");
let localConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
  insecureAuth: true,
  charset: "utf8mb4",
};
let dbConnect = async function () {
  console.log("---DB connecting:---");
  const schema_query_string = `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`;
  try {
    let sqlConnect = await mysql.createConnection(localConfig);
    console.log("Connected as id " + sqlConnect.threadId);
    const [results] = await sqlConnect.execute(schema_query_string);
    if (results) {
      console.log(`Schema ${process.env.DATABASE} created or already exists.`);
    }
    await sqlConnect.end();
  } catch (err) {
    console.error("Error connecting: " + err.stack);
  }
};

module.exports = { sequelize, dbConnect };
