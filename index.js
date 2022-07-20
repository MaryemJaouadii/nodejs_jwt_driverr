const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const unless = require("express-unless");

const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("data base connected");
    },
    (error) => {
      console.log("data base can`t be connected: " + error);
    }
  );

auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/drivers/login", methods: ["POST"] },
      { url: "/drivers/register", methods: ["POST"] },
    ],
  })
);

app.use(express.json());

app.use("/drivers", require("./routes/drivers.routes"));

app.use(errors.errorHandler);

app.listen(process.env.port || 4000, function () {
  console.log("Ready to Go!");
});
