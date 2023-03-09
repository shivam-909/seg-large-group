import './LoginPage.css';

function Welcome() {
  return (
    <div class="LoginPage">
      <header className="LoginPage-header">
        Welcome
        <div class='mt-5'>
        <a className='button' href="/LoginPage">Login In</a>
        <a className='button' href="/LoginPage">Sign Up</a>
        </div>
      </header>
    </div>
  );
}

export default Welcome;
