module.exports = {
  development: {
    username: "root",
    password: "123456",
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306, // Default port for MySQL
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:", // Use in-memory SQLite
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT, // Set from environment variable
  },
};
