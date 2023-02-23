import Navbar from "../Navbar/Navbar";
import SearchBar from "./SearchBar";

function SearchPage() {
  return (
    <div className="LoginPage">
      <Navbar/>
      <header className="LoginPage-header">
          Search Page
          <SearchBar/>
      </header>
    </div>
  );
}

export default SearchPage;
