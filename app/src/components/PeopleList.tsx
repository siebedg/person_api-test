interface Person {
  name: string;
  age: number;
}

interface PeopleListProps {
  people: Person[];
}

const PeopleList = ({ people }: PeopleListProps) => {
  return (
    <>
      <br />
      <div className="text-xl">All people</div>
      <br />
      {people.map((person) => (
        <div className="person-card">
          <div>{person.name}</div>
          <div>{person.age}</div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default PeopleList;
