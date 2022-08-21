// require the express module
import express from "express";
import Continent from "../models/Continent";

// create a new Router object
const continentRouter = express.Router();

const continents: Continent[] = [
  { name: "Asia", population: 4641054775, id: 1 },
  { name: "Africa", population: 1340598147, id: 2 },
  { name: "Europe", population: 747636026, id: 3 },
  { name: "North America", population: 592072212, id: 4 },
  { name: "South America", population: 430759766, id: 5 },
  { name: "Australia", population: 42677813, id: 6 },
  { name: "Antarctica", population: 0, id: 7 },
];

let nextId: number = 8;

continentRouter.get("/continents", (req, res) => {
  const { maxPopulation, phraseSearch } = req.query;
  let filteredContinents: Continent[] = continents;
  if (maxPopulation) {
    filteredContinents = filteredContinents.filter((item) => {
      return item.population <= parseInt(maxPopulation as string);
    });
  }
  if (phraseSearch) {
    filteredContinents = filteredContinents.filter((item) => {
      return item.name.includes(phraseSearch as string);
    });
  }
  res.status(200);
  res.json(filteredContinents);
});

continentRouter.get("/continents/id/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  const found: Continent | undefined = continents.find(
    (continent) => continent.id === id
  );
  if (found) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.send(`Continent with id of ${id} not found.`);
  }
});

continentRouter.get("/continents/name/:name", (req, res) => {
  const name: string = req.params.name;
  const found: Continent | undefined = continents.find(
    (continent) => continent.name === name
  );
  if (found) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.send(`Continent with name of ${name} not found.`);
  }
});

continentRouter.post("/continents", (req, res) => {
  const newContinent: Continent = req.body;
  newContinent.id = nextId++;
  continents.push(newContinent);
  res.status(201);
  res.json(newContinent);
});

continentRouter.delete("/continents/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  const index: number = continents.findIndex(
    (continent) => continent.id === id
  );
  if (index === -1) {
    res.status(404);
    res.send(`Continent with id of ${id} not found.`);
  } else {
    continents.splice(index, 1);
    res.sendStatus(204);
  }
});

export default continentRouter;
