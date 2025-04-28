import { useEffect, useState, useRef } from "react";

interface Message {
  type: 'text' | 'file';
  content: string;
  sender: string;
  filename?: string;
  userId?: string;
}

interface Room {
  id: string;
  name: string;
  active: boolean;
}

const downloadFile = (content: string, filename: string) => {
  const link = document.createElement('a');
  link.href = `data:application/octet-stream;base64,${content}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function AgentRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8001/ws/agent/');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received websocket message:', data); // Debug log
      
      if (data.type === 'room_update') {
        console.log('Updating rooms:', data.rooms); // Debug log
        setAvailableRooms(data.rooms);
      } else if (data.type === 'message') {
        setMessages(prev => [...prev, {
          type: 'text',
          content: data.message,
          sender: data.userId,
          userId: data.userId
        }]);
      } else if (data.type === 'file') {
        setMessages(prev => [...prev, {
          type: 'file',
          content: data.file.data,
          filename: data.file.name,
          sender: data.userId,
          userId: data.userId
        }]);
      }
    };

    setSocket(ws);
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && input.trim() && selectedRoom) {
      socket.send(JSON.stringify({
        type: 'message',
        userId: selectedRoom,
        message: input
      }));
      setMessages(prev => [...prev, {
        type: 'text',
        content: input,
        sender: 'Agent',
        userId: selectedRoom
      }]);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Room List Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Active Rooms</h2>
        <div className="space-y-2">
          {availableRooms.map(room => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`w-full p-2 text-left rounded ${
                selectedRoom === room.id ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              Room: {room.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            <div className="p-4 bg-white shadow-sm">
              <h2 className="text-xl font-bold">Chat with User {selectedRoom}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages
                .filter(msg => msg.userId === selectedRoom)
                .map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'Agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg p-3 max-w-[70%] ${
                      msg.sender === 'Agent' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}>
                      {msg.type === 'text' ? (
                        <div>{msg.content}</div>
                      ) : (
                        <div 
                          className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
                          onClick={() => downloadFile(msg.content, msg.filename || 'file')}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{msg.filename}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="p-4 bg-white border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
