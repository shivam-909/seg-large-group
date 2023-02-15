import './LoginPage.css';

function LoginPage() {
  return (
    <div className="App">
      <header className="App-header">
        Login Page
        <div className='App-text'>
        <input className='App-input' placeholder="Email"/>
        <input className='App-input' placeholder="Password"/>
        <button className='App-button'>Enter</button>
        </div>
      </header>
    </div>
  );
}

export default LoginPage;
