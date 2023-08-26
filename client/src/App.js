import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    // socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => setMessageReceived(data.message));
  }, [socket]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="message..."
        onChange={(e) => {
          setMessage(e.target.value);
          socket.emit("send_message", { message: e.target.value });
        }}
      />
      <button onClick={sendMessage}> send</button>
      <p>{messageReceived}</p>
    </div>
  );
}

export default App;
