const checkRoleUser = (req, res, next) => {
  try {
    const roleNum = req.user.roleId;
    // console.log(roleNum, "role");
    if (roleNum == 2) {
      next();
    } else if (roleNum == 1) {
      res.status(403).json("Forbidden");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = checkRoleUser;
