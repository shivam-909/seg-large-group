import './LoginPage.css';

function Welcome() {
  return (
    <div className="welcome">
      <header>
        Welcome
        <div class='mt-5'>
        <a class='welcome' href="/#">Job Seekers</a>
        <a class='welcome' href="/#">Employers</a>
        </div>
        <div class='mt-5'>
        New user? <a class='welcome' href='/#'>Sign up</a>
        </div>
      </header>
    </div>
  );
}

export default LoginPage;
