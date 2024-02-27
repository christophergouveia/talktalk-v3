"use client";

import { useEffect, useState } from "react";
import socket from "@/app/components/socket";

const Chat = () => {
  const [username, setUsername] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
        console.log('Conectado ao socket.io!');
        socket.emit('client-connected', { message: 'Olá, servidor!' });
      });
      socket.on('client-connected', (message) => {
        console.log(message)
      })
  }, [])

  return (
    <div>
      {/* Render the UI for selecting a username, displaying the list of rooms, and displaying the messages */}
    </div>
  );
};

export default Chat;