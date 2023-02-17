import './LoginPage.css';

function LoginPage() {
  function loginButton(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
  }
  return (
    <div className="App">
      <header className="App-header">
        Login Page
        <div className='App-text'>
        <input id='email' className='App-input' placeholder="Email"/>
        <input id='password' className='App-input' placeholder="Password"/>
        <button className='button' onClick={loginButton}>Enter</button>
        </div>
      </header>
    </div>
  );
}

export default LoginPage;
