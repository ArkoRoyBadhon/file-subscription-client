"use client"
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Replace with your server's URL

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    // Listen for 'notification' events from the server
    socket.on("notification", (message: string) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        message,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
