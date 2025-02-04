import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import PersonDetails from "./components/PersonDetails";
import PeopleList from "./components/PeopleList";
import { usePeopleData } from "./hooks/usePeopleData";

function App() {
  const { people, searchResult, setSearchValue } = usePeopleData();

  return (
    <>
      <section>
        <Header size="large" color="blue" />
        <div>
          <SearchForm onSearch={setSearchValue} />
          {searchResult && <PersonDetails person={searchResult} />}
        </div>
        <PeopleList people={people} />
      </section>
    </>
  );
}

export default App;
