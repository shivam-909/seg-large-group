import Navbar from "../Navbar/Navbar";
import SearchBar from "./SearchBar";

function SearchPage() {
  return (
      <div>
          <Navbar/>
          <div className="bg-lighter-grey min-h-screen items-center justify-center flex">
              <header className="bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3">
                  <SearchBar/>
              </header>
          </div>
      </div>
  );
}

export default SearchPage;
