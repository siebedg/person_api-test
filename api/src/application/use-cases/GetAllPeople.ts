import { Person } from "../../domain/models/Person.js";
import { IPersonRepository } from "../../domain/interfaces/IPersonRepository.js";

export class GetAllPeople {
  constructor(private personRepository: IPersonRepository) {}

  async execute(): Promise<Person[]> {
    return this.personRepository.getAll();
  }
}
