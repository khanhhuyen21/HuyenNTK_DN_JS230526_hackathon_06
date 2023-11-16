require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = process.env.PORT || 7070;
const taskRouter = require("./src/routes/taskManager.route");

app.use(express.json());
app.use(urlencodedParser);
app.use(cors());

app.use("/api/v1/todo", taskRouter);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
