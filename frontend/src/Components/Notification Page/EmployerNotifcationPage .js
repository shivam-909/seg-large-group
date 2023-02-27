import './NotificationPage.css';

function EmployerNotifications(){
  var interviews = [
    {company: "Smiths", date:"2023-03-10", time:"10:00 AM"}
  ];
  var dropdownContent = document.querySelector(".dropdown-content");
  if(interviews.length> 0){
    dropdownContent.innerHTML = "";
    for (var i = 0; i < interviews.length; i++){
      var interview = interviews[i];
      var item = document.createElement("div");
      item.classList.add("dropdown-item");
      item.innerText = interview.company +" - " + interview.date + " " + interview.time;
      dropdownContent.appendChild(item);
    }
    }
  else {
    var notify = document.querySelector("no-notifications");
    noNotifications.style.display = "block";
  }
  return (
    <div class='dropdown'>
       <button class= 'dropbtn'> Notification </button>
       <div class="dropdown-content">
        <p class= "no-notifications"> No notifications </p>
      </div>
    </div>

  )
  }

export default EmployerNotificationPage;
