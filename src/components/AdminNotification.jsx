import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

const AdminNotification = ({ notifications, markNotificationAsRead, markAllNotificationsAsRead  }) => {
  console.log(notifications)
  return (
    <div className="container my-5">
      <Button className='btn-success'>Back</Button>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Admin Notifications</h1>
        <Link to="/adminDashboard">
        </Link>
        <Button onClick={markAllNotificationsAsRead}>Mark all as read</Button>
      </div>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`list-group-item ${notification.read ? '' : 'list-group-item-warning'}`}
              onClick={() => markNotificationAsRead(notification._id)}
            >
              {notification.message}
              {!notification.read && (
                <span className="badge bg-secondary ms-2">Unread</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotification;


