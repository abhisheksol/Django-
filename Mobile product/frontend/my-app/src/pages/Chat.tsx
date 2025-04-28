import React, { useState, useEffect } from 'react';

const ChatRoom = ({ roomName }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection when the component mounts
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);

    // Set WebSocket instance
    setSocket(ws);

    // Listen for incoming messages from the server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, [roomName]);

  // Send message to WebSocket server
  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.send(JSON.stringify({ message }));
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room: {roomName}</h2>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
