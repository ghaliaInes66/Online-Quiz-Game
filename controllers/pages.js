

const User = require("../models/User");

const home = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.render("home", { user });
  } catch (error) {

    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const duoGamePage = (req, res) => {
  res.render("online");
};

const quizzesPage = (req, res) => {
  res.render("quizzes");
};

module.exports = {
  home,
  duoGamePage,
  quizzesPage
};
