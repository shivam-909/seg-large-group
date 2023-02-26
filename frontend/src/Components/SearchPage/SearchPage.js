import Navbar from "../Navbar/Navbar";
import SearchBar from "./SearchBar";
import JobList from "./JobList";
function SearchPage() {
  return (
      <div>
          <Navbar/>
          <div className="bg-lighter-grey min-h-screen items-center justify-center flex">
              <header className="mt-24 bg-white rounded-md sm:min-w-1/6 inline-grid px-12 py-7 space-y-3">
                  <SearchBar/>
                  <div className="">
                      <JobList/>
                  </div>
              </header>
          </div>
      </div>
  );
}

export default SearchPage;
