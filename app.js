const express = require("express");
const path = require("path");
const app = express();
const port = 80;

//Express specific stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("index.pug", params);
});

//start server
app.listen(port, () => {
  console.log(`the application started successfully on port ${port}`);
});
