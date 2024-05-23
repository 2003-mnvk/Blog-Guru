const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

//expreess
const app = express();

const dbURI =
  "mongodb+srv://admin:admin@mern.rtd2ksp.mongodb.net/nodejs?retryWrites=true&w=majority&appName=MERN";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engines
app.set("view engine", "ejs");

//mongoose and mongo sandbox routes

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  //   res.send("<p>Home page</>");

  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.send("<p>about page</>");
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

//404 pages
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
