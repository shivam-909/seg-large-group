import './Navbar.css';
export default function Navbar() {
    function showProfile() {
        const x = document.getElementById("expandProfile");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
    return (
        <div className = "topnav">
            <ul>
                <li className="text-2xl"><a href="/"><i className="fa-solid fa-house"></i></a></li>
                <li className='float-right right-6'><a className="text-2xl" href="#" onClick={showProfile}><i className="fa-solid fa-user"></i></a></li>
            </ul>
            <div className="top-[60px]" id="expandProfile">
                <a href="#Profile">Profile</a>
                <a href="#Saved">Saved Jobs</a>
                <a href="#Applications">Applications</a>
                <a href="#Settings">Settings</a>
            </div>
        </div>
    );
  }  