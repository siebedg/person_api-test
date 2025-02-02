import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./components/Header";

interface Person {
  name: string;
  age: number;
}

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Person | null>(null);

  const debounceTimer = useRef<number>();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // clear the previous timer
    clearTimeout(debounceTimer.current);

    // set a new timeout
    debounceTimer.current = setTimeout(() => {
      setSearchValue(value);
    }, 500);
  };

  // fetch all people
  useEffect(() => {
    axios
      .get<Person[]>("http://localhost:3000/people")
      .then((res) => setPeople(res.data))
      .catch((err) => console.log(err));
  }, []);

  // fetch person by name
  const fetchPerson = async () => {
    if (!searchValue) {
      setSearchResult(null);
      return;
    }
    try {
      const res = await axios.get<Person>(
        `http://localhost:3000/person/${searchValue}`
      );
      setSearchResult(res.data);
    } catch (err) {
      console.log(err);
      setSearchResult(null);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, [searchValue]);


  return (
    <>
      <section className="bg-blue-200">
        <Header size="large" color="blue" />
        <div>
          <form>
            <input
              type="search"
              onChange={handleSearchInputChange}
              placeholder="Search..."
            />
          </form>
          {searchResult && (
            <div className="text-3xl">
              <h3>Name: {searchResult.name}</h3>
              <h3>Age: {searchResult.age}</h3>
            </div>
          )}
        </div>

        <div>All people</div>
        {people.map((person) => (
          <div className="person-card">
            <div>{person.name}</div>
            <div>{person.age}</div>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
