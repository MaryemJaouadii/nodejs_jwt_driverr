

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "Snippet_sceretKey", (err, driver) => {
    if (err) return res.sendStatus(403);
    req.driver = driver;
    next();
  });
}

function generateAccessToken(phone) {
  return jwt.sign({ data: phone }, "Snippet_sceretKey", {
    expiresIn: "1h",
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};