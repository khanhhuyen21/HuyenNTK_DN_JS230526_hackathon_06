const connection = require("../configs/db.config");
const AppError = require("../utils/appError");

exports.getAllTasks = (req, res, next) => {
  connection.query("SELECT * FROM todolist", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data.length,
      data: data,
    });
  });
};

exports.createTasks = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [req.body.nametask, req.body.status];
  connection.query(
    `INSERT INTO todolist (nametask, status) VALUES(?,?)`,
    values,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "task created successfully",
      });
    }
  );
};
exports.getTasks = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No Task ID found", 404));
  }
  connection.query(
    "SELECT * FROM todolist WHERE id = ?",
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
  const { nametask, status } = req.body;
  const taskId = req.params.id;

  if (!taskId) {
    return next(new AppError("No task id found", 404));
  }
  connection.query(
    "UPDATE todolist SET nametask=?, status=? WHERE id=?",
    [nametask, status, taskId],
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
