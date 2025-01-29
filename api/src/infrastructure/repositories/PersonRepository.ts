import { IPersonRepository } from "../../domain/interfaces/IPersonRepository.js";
import { Person } from "../../domain/models/Person.js";
import fs from "fs/promises";

const filePath = "src/infrastructure/data/persons.json";

export class PersonRepository implements IPersonRepository {
  async getAll(): Promise<Person[]> {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data) as Person[];
    } catch (error) {
      console.error("Error reading JSON file:", error);
      return [];
    }
  }

  async getByName(name: string): Promise<Person | null> {
    const persons = await this.getAll();
    return persons.find((p) => p.name === name) || null;
  }

  async create(person: Person): Promise<Person> {
    const persons = await this.getAll();
    persons.push(person);
    await fs.writeFile(filePath, JSON.stringify(persons, null, 2));
    return person;
  }
}
