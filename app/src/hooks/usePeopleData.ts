import { useState, useEffect } from "react";
import axios from "axios";

interface Person {
  name: string;
  age: number;
}

export const usePeopleData = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Person | null>(null);

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

  return {
    people,
    searchResult,
    setSearchValue,
  };
};
