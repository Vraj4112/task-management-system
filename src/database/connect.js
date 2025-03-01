const { Sequelize } = require("sequelize");
const config = require("./config.js");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    dialectOptions: dbConfig.dialectOptions || {
      multipleStatements: true,
      insecureAuth: true,
    },
    define: {
      charset: "utf8mb4",
    },
    logging: env === "development" ? console.log : false,
  }
);

// -- just creating task_aviansoft schema in mysql local database
var mysql = require("mysql2/promise");
let dbConnect = async function () {
  console.log("---DB connecting:---");

  // Skip MySQL schema creation for non-MySQL environments
  if (dbConfig.dialect !== "mysql") {
    console.log("Skipping schema creation for non-MySQL environment.");
    return;
  }

  const localConfig = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.username,
    password: dbConfig.password,
    multipleStatements: true,
    insecureAuth: true,
    charset: "utf8mb4",
  };

  const schema_query_string = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`;

  try {
    let sqlConnect = await mysql.createConnection(localConfig);
    console.log("Connected as id " + sqlConnect.threadId);
    const [results] = await sqlConnect.execute(schema_query_string);
    if (results) {
      console.log(`Schema ${dbConfig.database} created or already exists.`);
    }
    await sqlConnect.end();
  } catch (err) {
    console.error("Error connecting: " + err.stack);
  }
};

module.exports = { sequelize, dbConnect };
