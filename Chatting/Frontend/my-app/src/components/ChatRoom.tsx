import { useEffect, useState, useRef } from "react";

interface Message {
  type: 'text' | 'file';
  content: string;
  sender: string;
  filename?: string;
}

const downloadFile = (content: string, filename: string) => {
  const link = document.createElement('a');
  link.href = `data:application/octet-stream;base64,${content}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function ChatRoom({ roomName }: { roomName: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket(`ws://127.0.0.1:8001/ws/chat/${roomName}/`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        setMessages(prev => [...prev, { type: 'text', content: data.message, sender: 'Other' }]);
      } else if (data.file) {
        setMessages(prev => [...prev, { 
          type: 'file', 
          content: data.file.data,
          filename: data.file.name,
          sender: 'Other'
        }]);
      }
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(JSON.stringify({ message: input }));
      setMessages(prev => [...prev, { type: 'text', content: input, sender: 'You' }]);
      setInput("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && socket) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result?.toString().split(',')[1];
        socket.send(JSON.stringify({
          file: {
            name: file.name,
            type: file.type,
            data: base64
          }
        }));
        setMessages(prev => [...prev, { 
          type: 'file', 
          content: base64 || '',
          filename: file.name,
          sender: 'You'
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-sm">
        <h2 className="text-xl font-bold">Chat Room: {roomName}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-3 max-w-[70%] ${
              msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}>
              <div className="text-sm mb-1">{msg.sender}</div>
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
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
