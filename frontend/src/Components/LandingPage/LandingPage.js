import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchPage/SearchBar";

function LandingPage() {
  return (
      <div>
          <Navbar/>
          <div className="bg-lighter-grey min-h-screen items-center justify-center flex">
              <header className="bg-white rounded-xl sm:min-w-1/6 inline-grid px-12 py-7 space-y-3">
                  <p className='mb-2 font-bold text-2xl flex justify-center'>Search for Jobs</p>
                  <SearchBar/>
              </header>
          </div>
      </div>
  );
}

export default LandingPage
