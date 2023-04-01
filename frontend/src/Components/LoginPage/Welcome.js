import './LoginPage.css';

function Welcome() {
  return (
    <div className="LoginPage">
      <header className="LoginPage-header">
        Welcome
        <div className='mt-5'>
        <a className='button' href="/LoginPage">Login In</a>
        <a className='button' href="/LoginPage">Sign Up</a>
        </div>
      </header>
    </div>
  );
}

export default Welcome;
