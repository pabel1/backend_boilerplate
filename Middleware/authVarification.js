const jwt = require("jsonwebtoken");
const UserModel = require("../Model/userModel");
const Errorhandeler = require("../Utility/ErrorHandler");
const authVerification = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  try {
    if (!token || !authorization) {
      return next(
        new Errorhandeler("Please login to access the resource", 401)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { email, userId } = decoded;
    req.email = email;
    // console.log(decoded);
    const rootUser = await UserModel.findOne({ email: email });
    // console.log(rootUser);
    req.user = rootUser;
    req.userId = userId;
    next();
  } catch (error) {
    next("Authentication Failed!");
  }
};

module.exports = authVerification;
