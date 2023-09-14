

const dashboard = (req, res) => {
  res.render('online');
}

const registerPage = (req, res) => {
  res.render('fake-register');
}

const loginPage = (req, res) => {
  res.render('fake-login');
}

module.exports = {
  dashboard,
  registerPage,
  loginPage
}