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
        <ul className={"navbar"}>
            <li className="float-left"><a href="/"><i className="fa-solid fa-house text-xl"></i></a></li>
            <div>
                <li className='float-right'><a className="" href="##" onClick={showProfile}><i className="fa-solid fa-user text-xl"></i></a></li>
                <li className='float-right'><a className="" href="##"><i className="fa-solid fa-bell text-xl"></i></a></li>
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