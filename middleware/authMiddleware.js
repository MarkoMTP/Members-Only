module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "Not Authorized" });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.membership_status === true) {
    next();
  } else {
    res.status(401).json({ msg: "Not Are Not An Member" });
  }
};
