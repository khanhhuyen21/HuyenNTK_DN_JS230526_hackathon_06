const connection = require("../configs/db.config");

class authController {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const results = await new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM users WHERE username = ? AND password = ?",
          [username, password],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });

      if (results.length === 0) {
        return res.status(401).json({ message: "Đăng nhập không thành công" });
      }

      const user = results[0];
      return res.status(200).json({ message: "Đăng nhập thành công", user });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }
  async logout(req, res) {
    return res.status(200).json({ message: "Đăng xuất thành công" });
  }
}

module.exports = new authController();
