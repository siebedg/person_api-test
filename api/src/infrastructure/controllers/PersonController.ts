import express, { Request, Response } from "express";
import { CreatePerson } from "../../application/use-cases/CreatePerson.js";
import { GetPerson } from "../../application/use-cases/GetPerson.js";
import { GetAllPeople } from "../../application/use-cases/GetAllPeople.js";

export class PersonController {
  constructor(
    private createPerson: CreatePerson,
    private getPerson: GetPerson,
    private getAllPeople: GetAllPeople
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { name, age } = req.body;
      const person = await this.createPerson.execute({ name, age });
      res.status(201).json(person);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Please provide a name and age",
      });
    }
  }

  async getByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const person = await this.getPerson.execute(name);
      res.status(200).json(person);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : "The person does not exist",
      });
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const people = await this.getAllPeople.execute();
      res.status(200).json(people);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch people" });
    }
  }
}
