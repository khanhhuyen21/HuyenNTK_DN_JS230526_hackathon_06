const connection = require("../configs/db.config");
const AppError = require("../utils/appError");

exports.getAllTasks = (req, res, next) => {
  connection.query("SELECT * FROM tasks", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data.length,
      data: data,
    });
  });
};

exports.createTasks = (req, res, next) => {
  const { name, priority, deadline, done, createdAt, updatedAt } = req.body;

  const values = [name, priority, deadline, done, createdAt, updatedAt];
  connection.query(
    `INSERT INTO tasks (name, priority, deadline, done, createdAt, updatedAt) VALUES(?,?,?,?,?,?)`,
    values,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "Task created successfully",
      });
    }
  );
};
exports.getTasks = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No Task ID found", 404));
  }
  connection.query(
    "SELECT * FROM tasks WHERE id = ?",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};

exports.updateTasks = (req, res, next) => {
  const { name, priority, deadline, done, createdAt, updatedAt } = req.body;
  const taskId = req.params.id;

  if (!taskId) {
    return next(new AppError("No task id found", 404));
  }
  connection.query(
    "UPDATE tasks SET name=?, priority=?, deadline=?, done=?, createdAt=?, updatedAt=? WHERE id=?",
    [name, priority, deadline, done, createdAt, updatedAt, taskId],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "Task updated!",
      });
    }
  );
};

exports.deleteTasks = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No Task id found", 404));
  }
  connection.query(
    "DELETE FROM todolist WHERE id=?",
    [req.params.id],
    function (err, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "Task deleted!",
      });
    }
  );
};
