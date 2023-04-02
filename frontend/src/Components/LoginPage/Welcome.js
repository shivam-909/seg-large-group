import './LoginPage.css';

function Welcome() {
  return (
    <div className="LoginPage">
      <header data-testid='welcome' className="LoginPage-header">
        Welcome
        <div className='mt-5'>
        <a data-testid='login-link' className='button' href="/login">Login In</a>
        <a data-testid='signup-link' className='button' href="/signup">Sign Up</a>
        </div>
      </header>
    </div>
  );
}

export default Welcome;
