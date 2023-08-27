import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [regex, setRegex] = useState("");
  const [result, setResult] = useState();
  console.log(result);

  useEffect(() => {
    console.log("running useEffect");
    socket.on("receive_message", (data) => {
      console.log(data);
      setResult(data.result);
    });
  }, [socket]);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="regx..."
          onChange={(e) => {
            setRegex(e.target.value);
            socket.emit("send_message", {
              regex: e.target.value,
              message: message,
            });
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="message..."
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit("send_message", {
              regex: regex,
              message: e.target.value,
            });
          }}
        />
      </div>

      <h2>Test</h2>
      <p>{String(result)}</p>
    </div>
  );
}

export default App;
