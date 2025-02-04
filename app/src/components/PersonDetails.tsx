interface Person {
  name: string;
  age: number;
}

interface PersonDetailsProps {
  person: Person;
}

const PersonDetails = ({ person }: PersonDetailsProps) => {
  return (
    <div className="text-3xl">
      <h3>Name: {person.name}</h3>
      <h3>Age: {person.age}</h3>
    </div>
  );
};

export default PersonDetails;
