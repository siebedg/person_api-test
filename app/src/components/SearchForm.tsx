import { useRef } from "react";

interface SearchFormProps {
  onSearch: (value: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const debounceTimer = useRef<number>();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  return (
    <form>
      <input
        type="search"
        onChange={handleSearchInputChange}
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchForm;
