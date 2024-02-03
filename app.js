// Initialize App
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

// External Packages
require('dotenv').config();
const cookieParser = require('cookie-parser');
const io = require('socket.io')(server);

// Local Modules
const connectDB = require('./db/connect');
const authMiddleware = require('./middlewares/authentication');
const errorHandler = require('./middlewares/error-handler');
const { startDuoGame } = require('./controllers/DuoGames');

// Variables
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

// Set Template Engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());

// Import Routes
const authRouter = require('./routes/auth');
const pagesRouter = require('./routes/pages');
const quizzesRouter = require('./routes/quizzes');
const SoloGamesRouter = require('./routes/soloGames');
const publicRouter = require('./routes/public');

// Create Routes
app.use('/', publicRouter);
app.use('/pages', authMiddleware, pagesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/quizzes', authMiddleware, quizzesRouter);
app.use('/api/v1/solo-games', authMiddleware, SoloGamesRouter);

// Socket
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  startDuoGame(socket);
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

// Error Handler Middleware
app.use(errorHandler);

server.listen(PORT, async () => {
  try {
    await connectDB(URI);
    console.log(`The Server is listening on port ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});
