import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("chat message");
  }, []);

  const sendMessage = async () => {
    if (!input && !file) return;

    let fileUrl = null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      fileUrl = "http://localhost:4000" + data.url;
    }

    const newMsg = {
      text: input,
      file: fileUrl,
      sender: "me",
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("chat message", newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setFile(null);
  };

  return (
    <div className="flex flex-col h-[500px] w-[400px] bg-white/90 dark:bg-gray-800 rounded-2xl shadow-xl p-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-md animate-fadeIn
              ${msg.sender === "me" ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"}`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.file && (
                <img
                  src={msg.file}
                  alt="upload"
                  className="mt-2 rounded-lg max-h-40 object-cover"
                />
              )}
              <span className="block text-xs text-right opacity-60 mt-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center space-x-2 mt-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          📎
        </label>
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-full border dark:bg-gray-700 dark:text-white"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
