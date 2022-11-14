const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();
const http = require("http");
const apis = require("./routes/api");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");

env.config();

app.use(express.json());
app.use(morgan("common"));

app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api", apis);

// //mongodb
// //mongodb+srv://root:haggahagga@cluster0.fxcvj.mongodb.net/BlogApp?retryWrites=true&w=majority
app.use(errorHandler);

let createServer = http.createServer(app);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fxcvj.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log("error", e);
  });

createServer.listen(process.env.PORT, () => {
  console.log("Listening at the port", process.env.PORT);
});
