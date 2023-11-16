const express = require("express");
const taskRouter = express.Router();
const controller = require("../controllers/task.controller");
const checkAuthentication = require("../middlewares/verifyToken");
const checkRoleUser = require("../middlewares/verifyRole");

taskRouter
  .route("/")
  .get(controller.getAllTasks)
  .post(checkAuthentication, checkRoleUser, controller.createTasks);

taskRouter
  .route("/:id")
  .get(controller.getTasks)
  .put(checkAuthentication, checkRoleUser, controller.updateTasks)
  .delete(checkAuthentication, checkRoleUser, controller.deleteTasks);

module.exports = taskRouter;
