const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const database = require('./db/connect'); 
const AuthRouter = require("./routes/auth");

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use("/api", AuthRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});