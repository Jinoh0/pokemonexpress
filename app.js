const express = require("express");
require("dotenv").config();

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();
app.use(express.json());

// -- Define your route listeners here! --

app.get("/pokemon", (req, res, next) => {
  console.log("json");
  return res.status(200).json(allPokemon);
});

app.get("/pokemon/:id", (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  const onePokemon = allPokemon.find((pokemon) => {
    pokemon.id == id;
  });
  console.log(onePokemon);
  return res.status(200).json(onePokemon);
});

app.get("/search", (req, res, next) => {
  console.log(req.query);
  console.log(Object.keys(req.query));
  if (
    Object.keys(req.query).includes("name") &&
    Object.keys(req.query).includes("types")
  ) {
    const foundPokemon = [];
    allPokemon.forEach((pokemon) => {
      if (
        pokemon.name.includes(req.query.name) &&
        pokemon.types.includes(req.query.types)
      ) {
        foundPokemon.push(pokemon);
      }
    });
    return res.status(200).json(foundPokemon);
  }
  if (Object.keys(req.query).includes("name")) {
    const foundPokemon = [];
    allPokemon.forEach((pokemon) => {
      if (pokemon.name.includes(req.query.name)) {
        foundPokemon.push(pokemon);
      }
    });
    return res.status(200).json(foundPokemon);
  }
  if (Object.keys(req.query).includes("types")) {
    const foundPokemon = [];
    allPokemon.forEach((pokemon) => {
      if (pokemon.types.includes(req.query.types)) {
        foundPokemon.push(pokemon);
      }
    });
    return res.status(200).json(foundPokemon);
  }
});
app.get("/search2", (req, res) => {
  console.log(req.query);
  if (Object.keys(req.query).length === 0) {
    return res.status(400).json("Por favor, informe algum parâmetro de busca");
  }
  let foundPokemon = [];
  Object.keys(req.query).forEach((busca) => {
    console.log(busca);
    if (busca === "name") {
      allPokemon.forEach((pokemon) => {
        if (pokemon.name.includes(req.query[busca])) {
          foundPokemon.push(pokemon);
        }
      });
    }
    if (busca === "types") {
      allPokemon.forEach((pokemon) => {
        if (pokemon.types.includes(req.query[busca])) {
          foundPokemon.push(pokemon);
        }
      });
    }
  });
  return res.status(200).json(foundPokemon);
});
//POST
app.post("/create", (req, res) => {
  const form = req.body;
  allPokemon.push(form);
  return res.status(201).json(form);
});
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  allPokemon.forEach((pokemon, index) => {
    if (pokemon.id == id) {
      allPokemon[index] = { ...pokemon, ...req.body };
      console.log("forEach", pokemon);
    }
  });
  return res.status(200).json(allPokemon);
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const newArray = allPokemon.filter((pokemon) => {
    return pokemon.id !== +id;
  });
  console.log(newArray);
  allPokemon = newArray;
  return res.status(200).json(allPokemon);
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
