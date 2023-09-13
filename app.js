const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const AuthRouter = require("./router/auth");

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use("/api", AuthRouter);

app.listen(PORT, () => {
  console.log(`listening on port : http://localhost:${PORT}/api`);
});