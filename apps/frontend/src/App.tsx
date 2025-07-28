import { useEffect } from "react";
import { connectWebSocket } from "./actions/ws";
import Lobby from "./components/Lobby";
import ConnectionErrorOverlay from "./components/Error";
import "./style.css";

export default function App() {
  useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
      <Lobby />
      <ConnectionErrorOverlay />
    </div>
  );
}
