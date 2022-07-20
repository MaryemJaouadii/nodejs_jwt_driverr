
const Driver = require("../models/drivers.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");

async function login({ phone, password }, callback) {
  const driver = await Driver.findOne({ phone });

  if (driver != null) {
    if (bcrypt.compareSync(password, driver.password)) {
      const token = auth.generateAccessToken(phone);
      return callback(null, { ...driver.toJSON(), token });
    } else {
      return callback({
        message: "Invalid phone/Password!",
      });
    }
  } else {
    return callback({
      message: "Unvalid phone/Password!",
    });
  }
}

async function register(params, callback) {
  if (params.phone === undefined) {
    return callback({ message: "phone Required" });
  }

  const driver = new Driver(params);
  driver
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  login,
  register,
};