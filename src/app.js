const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
// Setando a porta pro heroku || localhost
const port = process.env.PORT || 3000;
//DEFININDO PATHS E CONFIGURAÇOES DO EXPRESS
const publicDirectoryPath = path.join(__dirname, "../public");

// O express supõe que sua pasta pras views do hbs deve se chamar views, caso queira mudar isso, coloca o caminho pra pasta das views em uma variável, e usa app.set depois
const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

// SETUP HANDLEBARS ENGINE E O LOCAL DAS VIEWS
// app.set deixa voce setar um valor para uma configuração do express
app.set("view engine", "hbs"); // Aqui voce seta um valor pra template engine, no caso vamos usar hbs
app.set("views", viewsPath); // Aqui seta o path pras views, que tá na pasta templates/views
hbs.registerPartials(partialsPath); // Aqui seta o path pras partials, que ta na pasta templates/partials

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather App", name: "Vinao" }); // res.render renderiza o arquivo passado na função. Nesse caso tá renderizando o arquivo index.hbs, que é um HTML dinâmico. Passamos como segundo argumento um objeto com todos os valores que queremos que o hbs tenha acesso
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Vinao" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help page",
    title: "Help",
    name: "Vinao",
  });
});
app.get("/weather", (req, res) => {
  // req.query retorna um objeto com os pares key/value passados na query da URL (nesse caso a key é address)
  if (!req.query.address) {
    return res.send({ error: "Must provide an address" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          visibility: forecastData.visibility,
          temperature: forecastData.temperature,
          precipitation: forecastData.precipitation,
          feelslike: forecastData.feelslike,
          location,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help 404 error",
    text: "Help article not found.",
    name: "Vinao",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error",
    text: "Page not found.",
    name: "Vinao",
  });
});

app.listen(port, () => {
  console.log("Server is up on" + port);
});
