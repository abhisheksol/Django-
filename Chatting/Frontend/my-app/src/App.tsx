import { useState } from "react";
import RoomList from "./components/RoomList";
import ChatRoom from "./components/ChatRoom";
import AgentRoom from "./components/AgentRoom";

function App() {
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [isAgent, setIsAgent] = useState(false);

  if (isAgent) {
    return (
      <div className="min-h-screen bg-gray-100">
        <button 
          onClick={() => setIsAgent(false)}
          className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Switch to User View
        </button>
        <AgentRoom />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <button 
        onClick={() => setIsAgent(true)}
        className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Switch to Agent View
      </button>
      {!currentRoom ? (
        <RoomList onJoin={(roomName) => setCurrentRoom(roomName)} />
      ) : (
        <ChatRoom roomName={currentRoom} />
      )}
    </div>
  );
}

export default App;
