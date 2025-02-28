const helmet = require("helmet");
const crypto = require("crypto");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString("hex");
    next();
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
        },
      },
    })
  );
  app.use(helmet.hsts({ maxAge: 31536000 }));
  app.disable("x-powered-by");
};
