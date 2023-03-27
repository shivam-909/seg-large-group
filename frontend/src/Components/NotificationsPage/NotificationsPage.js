import {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/notifications/${id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then(notifications => setNotifications(notifications.data))
            .catch(error => {console.log(error)});
    }, [notifications, token]);

    function deleteNotification(id) {
        axios.delete(`http://localhost:8000/api/notifications/${id}`, {headers: {Authorization: `Bearer ${token}`}})
            .catch(error => {console.log(error)});
        document.getElementById(id).remove();
    }

    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center pt-36 h-screen">
                {notifications.length > 0 ?
                    <div className='w-2/3 space-y-4'>
                        <h1 className='font-bold text-3xl'>My Notifications</h1>
                        <div className='bg-darker-grey h-[1px]'></div>
                        {notifications.map(notification => {
                            return (
                                <div id={notification.id} className='flex p-4 rounded-md border justify-between'>
                                    <div>
                                        {notification.content === 'Withdrawal' &&
                                            <div className='space-y-2'>
                                                <p className='text-red font-bold text-xl'>Application Withdrawn</p>
                                                <p>An applicant has withdrawn their application for {notification.title}.</p>
                                            </div>
                                        }
                                        {notification.content === 'NewApplicant' &&
                                            <div className='space-y-2'>
                                                <p className='text-green font-bold text-xl'>New Applicant</p>
                                                <p>You've received a new application for {notification.title}.</p>
                                            </div>
                                        }
                                        {notification.content === 'Interview' &&
                                            <div className='space-y-2'>
                                                <p className='text-orange font-bold text-xl'>Interview Invite</p>
                                                <p>{notification.companyName} has invited you to interview for {notification.title}.</p>
                                            </div>
                                        }
                                        {notification.content === 'Rejection' &&
                                            <div className='space-y-2'>
                                                <p className='text-red font-bold text-xl'>Application Rejected</p>
                                                <p>You've been rejected for {notification.title}.</p>
                                            </div>
                                        }
                                        {notification.content === 'Accepted' &&
                                            <div className='space-y-2'>
                                                <p className='text-green font-bold text-xl'>You're hired!</p>
                                                <p>You've been accepted for {notification.title}.</p>
                                            </div>
                                        }
                                    </div>
                                    <button className='fa-solid fa-x' onClick={() => deleteNotification(notification.id)}/>
                                </div>
                            );
                        })}
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center space-y-5'>
                        <i className="fa-solid fa-bell text-9xl"></i>
                        <h1 className='font-bold text-3xl'>No Notifications Yet</h1>
                        <div>
                            <p>You have no notifications right now.</p>
                            <p>When you do, they'll show up here.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}