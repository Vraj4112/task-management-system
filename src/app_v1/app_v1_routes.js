const express = require("express");
const app = express();
const { checkForAuthentication } = require("../middlewares/jwt_auth");

const user = require("./authentication_module/routes");
const tasks = require("./Task_module/routes");

app.use("/auth", user);
app.use("/tasks", checkForAuthentication, tasks); // checkForAuthentication middleware added

module.exports = app;
