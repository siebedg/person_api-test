import { Person } from "../../domain/models/Person.js";
import { IPersonRepository } from "../../domain/interfaces/IPersonRepository.js";

export class CreatePerson {
  constructor(private personRepository: IPersonRepository) {}

  async execute(person: Person): Promise<Person> {
    if (!person.name || !person.age)
      throw new Error("Name and age are required");
    if (person.age < 18)
      throw new Error("Person must be at least 18 years old");

    const existingPeson = await this.personRepository.getByName(person.name);
    if (existingPeson) throw new Error("Person already exists");

    const newPerson = new Person(person.name, person.age);
    return this.personRepository.create(newPerson);
  }
}
