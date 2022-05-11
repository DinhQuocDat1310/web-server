//Import path
const path = require("path");
//Import thằng Express
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

const weatherData = (req, res) => {
  const data = req.query;
  if (!data.address) {
    return res.send({
      errorMessage: "Your address is missing",
    });
  }
  geocode(data.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, { feelslike } = {}) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        latitude,
        longitude,
        location,
        // temperature,
        feelslike,
      });
    });
  });
};

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Dinh Quoc Dat",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    content: "This is about page",
    name: "Dinh Quoc Dat",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    content: "This is help page",
    name: "Dinh Quoc Dat",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dinh Quoc Dat",
    errorMessage: "Help artical is not found",
  });
});

app.get("/products", (req, res) => {
  const data = req.query;
  if (!data.name) {
    return res.send({
      error: "You must provide a search item",
    });
  }
  console.log(data.name);
  res.send({
    products: [],
  });
});

app.get("/weather", weatherData);

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dinh Quoc Dat",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server run at port ${port}`);
});
