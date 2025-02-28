require("./config/env-config.js");

const app = require("./config/app-config.js");
const { sequelize, dbConnect } = require("./src/database/connect.js");
const { initAssociations } = require("./src/database");

const PORT = process.env.PORT || 3002;

const initializeSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection success.");
    await initAssociations();
    await sequelize.sync({ force: false });
    console.log("Database sync.");
  } catch (error) {
    console.error("Unable to connect to database", error);
    throw error;
  }
};
const main = async () => {
  try {
    await dbConnect();
    await initializeSequelize();
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};
main();
