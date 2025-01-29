import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { PersonController } from "./infrastructure/controllers/PersonController.js";
import { PersonRepository } from "./infrastructure/repositories/PersonRepository.js";
import { CreatePerson } from "./application/use-cases/CreatePerson.js";
import { GetPerson } from "./application/use-cases/GetPerson.js";
import { GetAllPeople } from "./application/use-cases/GetAllPeople.js";
import cors from "cors";

// express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// dependencies
const personRepository = new PersonRepository();
const createPerson = new CreatePerson(personRepository);
const getPerson = new GetPerson(personRepository);
const getAllPeople = new GetAllPeople(personRepository);
// controller
const personController = new PersonController(createPerson, getPerson, getAllPeople);

// routes
app.post("/person", personController.create.bind(personController));
app.get("/person/:name", personController.getByName.bind(personController));
app.get("/people", personController.getAll.bind(personController));

export default app;

