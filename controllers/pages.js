const dashboard = (req, res) => {
  res.render("landing");
};

const registerPage = (req, res) => {
  res.render("signUp");
};

const loginPage = (req, res) => {
  res.render("login");
};

module.exports = {
  dashboard,
  registerPage,
  loginPage,
};
