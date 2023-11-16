require("dotenv").config();
const express = require("express");
const Router = require("./src/routers/index");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.APP_PORT;
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

Router(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
