const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
<<<<<<< HEAD
  app.use(helmet());
=======
  // app.use(helmet());
>>>>>>> 7cb211922d6792d5e2ea5b57d915d1ba7aaf6f39
  app.use(compression());
};
