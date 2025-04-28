import { useState } from "react";

export default function RoomList({ onJoin }: { onJoin: (roomName: string) => void }) {
  const [roomName, setRoomName] = useState("");

  const handleJoin = () => {
    if (roomName.trim()) {
      onJoin(roomName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Join Chat Room</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleJoin}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
