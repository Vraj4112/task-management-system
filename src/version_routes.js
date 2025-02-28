const express = require("express");
const app = express();

const version_if_any = require("./app_v1/app_v1_routes");

app.use("/", version_if_any);

// for Example
//app.use("/v1", v1);

module.exports = app;
