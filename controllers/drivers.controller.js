const bcryptjs = require("bcryptjs");
const driverService = require("../services/drivers.services");

exports.register = (req, res, next) => {
  const { username, phone, password, car_model, car_number } = req.body;

  const salt = bcryptjs.genSaltSync(10);

  req.body.password = bcryptjs.hashSync(password, salt);

  driverService.register(req.body, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.login = (req, res, next) => {
  const { phone, password } = req.body;
  console.log("phone: " + phone + "password: " + password);

  driverService.login({ phone, password }, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.driverProfile = (req, res, next) => {
  return res.status(200).json({ message: "Authorozed Driver!" });
};
