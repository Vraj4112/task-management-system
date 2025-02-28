const express = require("express");
const app = express();

const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

const helmetConfig = require("./helmet-config");
const rateLimitConfig = require("./rateLimit-config");

// Middleware configurations
app.use(rateLimitConfig);
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({ threshold: 1024 }));

helmetConfig(app); // Configure helmet

app.use(express.static(path.resolve("./public")));

// Routes and middlewares
const src = require("../src/version_routes");
const errorHandler = require("../src/middlewares/error_handler");

app.use("/api", src); // Main entry point to application
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("node app running!!!");
});

app.use((req, res) => {
  res.status(404).send("<h1>404</h1> <h3>Route not found.</h3>");
});

module.exports = app;
