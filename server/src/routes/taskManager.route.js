const express = require("express");
const taskRouter = express.Router();
const controller = require("../controllers/taskManager.controller");

taskRouter.route("/").get(controller.getAllTasks).post(controller.createTasks);

taskRouter
  .route("/:id")
  .get(controller.getTasks)
  .put(controller.updateTasks)
  .delete(controller.deleteTasks);

module.exports = taskRouter;
