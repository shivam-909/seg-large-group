import './LoginPage.css';

function LoginPage() {
  function loginButton(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
  }
  function hidePassword() {
    let passwordField = document.getElementById("password");
    let eye = document.getElementById("toggleEye");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eye.className = "fa-solid fa-eye-slash";
    } else {
      passwordField.type = "password";
      eye.className = "fa-solid fa-eye"
    }
  }
  return (
    <div className="LoginPage">
      <header className="LoginPage-header">
        Login Page
        <div className='LoginPage-text'>
        <input id='email' className='email-input' placeholder="Email"/>
        <div>
          <input id='password' type="password" className='password-input' placeholder="Password"/>
          <button type='checkbox' className='togglePasswordButton' onClick={hidePassword}><i id='toggleEye' className="fa-solid fa-eye"></i></button>
        </div>
        <button className='button' onClick={loginButton}>Enter <i class="fa-solid fa-right-to-bracket"></i></button>
        </div>
      </header>
    </div>
  );
}

export default LoginPage;
