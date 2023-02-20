import './LoginPage.css';

function LoginPage() {
  function loginButton(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let rememberPass = document.getElementById("rememberPass").checked;
    if (rememberPass === true){
      localStorage.setItem("email", email)
      localStorage.setItem("password", password)
      localStorage.setItem("rememberPass", true)
    }
    else{
      localStorage.removeItem("email")
      localStorage.removeItem("password")
      localStorage.removeItem("rememberPass")
    }
    // API backend needed to be added.
  }
  function hidePassword() {
    // Toggles the password field visibility and icon.
    let passwordField = document.getElementById("password");
    let eye = document.getElementById("toggleEye");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eye.className = "fa-solid fa-eye-slash";
    } else {
      passwordField.type = "password";
      eye.className = "fa-solid fa-eye";
    }
  }
  return (
    <div className="LoginPage">
      <header className="LoginPage-header">
        Login Page
        <div className='LoginPage-text'>
        <input id='email' className='email-input' defaultValue={localStorage.getItem("email")} placeholder="Email"/>
        <div>
          <input id='password' type="password" className='password-input' defaultValue={localStorage.getItem("password")} placeholder="password"/>
          <button type='checkbox' className='togglePasswordButton' onClick={hidePassword}><i id='toggleEye' className="fa-solid fa-eye"></i></button>
        </div>
        <div>
          <input id='rememberPass' class='w-5 h-5 inline-block' type='checkbox' defaultChecked={localStorage.getItem("rememberPass")}/> Remember Me
        </div>
        <div class='mt-5'>
        New user? <a className='LoginPage-link' href='/#'>Sign up.</a>
        </div>
        <button className='button' onClick={loginButton}>Enter <i class="fa-solid fa-right-to-bracket"></i></button>
        </div>
      </header>
    </div>
  );
}

export default LoginPage;