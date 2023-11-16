const authRoute = require("./auth.route");
const taskRouter = require("./task.route");

function Router(app) {
  app.use("/auth", authRoute);
  app.use("/task", taskRouter);
}

module.exports = Router;
