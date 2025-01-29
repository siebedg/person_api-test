import { Person } from "../models/Person.js";

export interface IPersonRepository {
  create(person: Person): Promise<Person>;
  getByName(name: string): Promise<Person | null>;
  getAll(): Promise<Person[]>;
}
