// Initalize App
const express = require("express");
const app = express();

// External Packages
require('dotenv').config();

// Local Modules
const connectDB = require('./db/connect');

// Variables
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// Set Template Engine
app.set('view engine', 'pug');
app.set('views', __dirname + './views');

// Middlewares
app.use(express.static(__dirname + '/public'));
// app.use(express.urlencoded({ extended: true })); --> We Don't Need This We'll Use json
app.use(express.json());

// Import Routers
const authRouter = require('./routes/auth');
const pagesRouter = require('./routes/pages');
const quizzesRouter = require('./routes/quizes');
const SoloGamesRouter = require('./routes/soloGames');

// Create Routes
app.use('/', pagesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/quizzes', quizzesRouter);
app.use('/api/v1/solo-games', SoloGamesRouter);

app.listen(PORT, async () => {
  try {
    await connectDB(URI);
    console.log(`The Server is listening on port ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});