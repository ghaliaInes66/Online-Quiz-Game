

const dashboard = (req, res) => {
  res.render('online');
}

const registerPage = (req, res) => {
  res.render('signUp');
}

const loginPage = (req, res) => {
  res.render('login');
}

module.exports = {
  dashboard,
  registerPage,
  loginPage
}