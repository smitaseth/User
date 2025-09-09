import React, { useState } from "react";

interface SearchProps {
  user: any[];
  onFilter: (filtered: any[]) => void;
}

const Search = ({ user, onFilter }: SearchProps): React.ReactElement => {
  const [searchVal, setSearchVal] = useState<string>(""); // State to store input value

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value); // Update state on input change
    if (event.target.value === "") {
      onFilter(user); // If input is cleared, reset the filter
    }
  };
  const handleSearch = () => {
    const filteredUser = user.filter((item: any) => {
      return item.name.toLowerCase().includes(searchVal.toLowerCase());
    });

    onFilter(filteredUser);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      <input
        type="text"
        placeholder="search user name"
        value={searchVal}
        onChange={handleInputChange}
        className="border p-2 rounded"
      />
      <button
        onClick={handleSearch}
        className="rounded bg-blue-600 text-white cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};
export default Search;
