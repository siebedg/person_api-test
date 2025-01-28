import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import fs from "fs";

const filePath = "src/persons.json";

interface Person {
  name: string;
  age: number;
}

function readPersons(): Person[] {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) as Person[];
  } catch (error) {
    console.error("Error reading/parsing JSON file:", error);
    return [];
  }
}

function writePersons(persons: Person[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(persons, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing JSON file:", error);
  }
}

// express app
const app = express();
app.use(bodyParser.json());

// create a person
app.post("/person", (req: Request, res: Response) => {
  const person: Person = req.body;
  if (!person.name || !person.age) {
    res.status(400).send("Name and age are required");
    return;
  }
  if (person.age < 18) {
    res.status(400).send("Person must be at least 18 years old");
  }
  if (readPersons().find((p) => p.name === person.name)) {
    res.status(400).send("Person with this name already exists");
    return;
  }
  const persons = readPersons();
  persons.push(person);
  writePersons(persons);
  res.status(201).send(person);
});

// search for a person
app.get("/person/:name", (req: Request, res: Response) => {
  const name = req.params.name;
  const persons = readPersons();
  const person = persons.find((p) => p.name === name);
  if (person) {
    res.send(person);
  } else {
    res.status(404).send("Person not found");
  }
});

export default app;
