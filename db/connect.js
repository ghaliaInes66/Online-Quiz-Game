const mongoose = require('mongoose');

/***** NOTE
    it's bad practice to use database URI in code for security
    it's much better to get it from .env file like this:
    const uri = process.env.MONGO_URI
*****/
// const url = 'mongodb+srv://zmeddahi2001:3fKQBBDjcjXx6Dvq@cluster0.mfmabgc.mongodb.net/Quiz-Game?retryWrites=true&w=majority';
// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// New Code
const connectDB = async (uri) => {
  await mongoose.connect(uri).then(() => {
    console.log("Connected To MongoDB Successfully");
  }).catch((err) => {
    console.error(`Error Connecting to DB: ${err}`);
  });
}

module.exports = connectDB
