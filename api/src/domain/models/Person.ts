export class Person {
    constructor(
      public name: string, 
      public age: number) 
      {
          if(!name || !age) {
              throw new Error("Name and age are required");
          }
          if(age < 18) {
              throw new Error("Person must be at least 18 years old");
          }
      }
  }
