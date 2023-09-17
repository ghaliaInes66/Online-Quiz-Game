const mongoose = require('mongoose');

const connectDB = async (uri) => {
  await mongoose.connect(uri).then(() => {
    console.log("Connected To MongoDB Successfully");
  }).catch((err) => {
    console.error(`Error Connecting to DB: ${err}`);
  });
}

module.exports = connectDB