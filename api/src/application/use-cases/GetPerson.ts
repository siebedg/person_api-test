import { Person } from "../../domain/models/Person.js";
import { IPersonRepository } from "../../domain/interfaces/IPersonRepository.js";

export class GetPerson {
  constructor(private personRepository: IPersonRepository) {}

  async execute(name: string): Promise<Person | null> {
    if (!name) throw new Error("Name is required");
    const person = await this.personRepository.getByName(name);
    if (!person) {
      throw new Error("Person not found");
    }
    return person;
  }
}
