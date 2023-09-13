const mongoose = require('mongoose');

const url = 'mongodb+srv://zmeddahi2001:3fKQBBDjcjXx6Dvq@cluster0.mfmabgc.mongodb.net/Quiz-Game?retryWrites=true&w=majority';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
