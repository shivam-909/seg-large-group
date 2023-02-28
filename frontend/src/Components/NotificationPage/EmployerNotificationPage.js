import './NotificationPage.css';
import React, {useEffect} from 'react';

function EmployerNotificationPage(){
  const interviews = [{company: "Smiths", date:"2023-03-10", time:"10:00 AM"}];

  useEffect (() =>{
    const dropdownContent = document.querySelector(".dropdown-content");
    if (interviews.length > 0) {
      dropdownContent.innerHTML = "";
      for (let i = 0; i < interviews.length; i++) {
        const interview = interviews[i];
        const item = document.createElement("div");
        item.classList.add("dropdown-item");
        item.innerText = interview.company + " - " + interview.date + " " + interview.time;
        dropdownContent.appendChild(item);
      }
    } else {
      const noNotifications = document.querySelector(".no-notifications");
      noNotifications.style.display = "block";
    }
  }, [interviews]);
  return (
    <div class='dropdown'>
       <button class= 'dropbtn'> Notification </button>
       <div className = 'dropdown-content'>
          <p class= "no-notifications"> No notifications </p>
      </div>
    </div>

  );
  }


export default EmployerNotificationPage;
