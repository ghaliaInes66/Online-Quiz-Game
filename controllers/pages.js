const dashboard = (req, res) => {
  res.render("landing");
};

const registerPage = (req, res) => {
  res.render("signUp");
};

const loginPage = (req, res) => {
  res.render("login");
};

const User = require("../models/User");

const home = async (req, res) => {
  try {
    const id = '65041f031bdbee233e8ba12f';
    const user = await User.findById(id);

    res.render("home", { user });
  } catch (error) {

    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  dashboard,
  registerPage,
  loginPage,
  home
};
