import './NotifcationPage.css';

function Notification(){
  function confirmInterview(){
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    alert("Your interview has been scheduled for" + date + " at " + time + ".");

  }
  return(
    <div class='dropdown'>
       <button class= 'dropbtn'> Notification </button>
              <header className='mb-6 font-bold text-2xl flex justify-center'>Your Profile Page</header>
          <p>Congratulations!</p>
          <p>Yous
        </div>
    </div>
  )
}
export default UserNotificationPage;
