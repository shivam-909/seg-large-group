import './Navbar.css';
export default function Navbar() {
    function showProfile() {
        var x = document.getElementById("expandProfile");
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
            <div>
                <li className='float-right'><a className="text-2xl" href="##" onClick={showProfile}><i class="fa-solid fa-user"></i></a></li>
            </div>
        </ul>
        <div className="top-16" id="expandProfile">
            <a href="#Profile"><i id="icon" className="fa-solid fa-id-card pr-2"></i> Profile</a>
            <a href="#Saved"><i id="icon" className="fa-solid fa-folder-open pr-2"></i>My Jobs</a>
            <a href="#Settings"><i id="icon" className="fa-solid fa-gear pr-2"></i>Settings</a>
        </div> 
    </div>
    );
  }  