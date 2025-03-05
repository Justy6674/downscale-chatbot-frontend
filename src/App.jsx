import { useState } from "react";
import "./index.css";

const ChatbotUI = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I assist you today?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setMessages([...messages, { text, sender: "user" }]);
    setInput("");

    try {
      const response = await fetch("https://downscale-chatbot-backend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reply, sender: "ai" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error: Unable to fetch response.", sender: "ai" }]);
    }
  };

  const resetChat = () => {
    setMessages([{ text: "Hi! How can I assist you today?", sender: "ai" }]);
  };

  return (
    <div className="fixed bottom-5 right-5 w-[350px] rounded-lg shadow-lg">
      {isOpen && (
        <div className="bg-[#f7f2d3] border border-[#b68a71] flex flex-col rounded-lg">
          <div className="bg-[#b68a71] text-white p-3 rounded-t-lg flex justify-between items-center">
            <h1 className="text-lg font-bold">AbeAi Assistant</h1>
            <button onClick={() => setIsOpen(false)} className="text-white font-bold">✖</button>
          </div>
          <div className="p-4 h-[400px] overflow-y-auto bg-white">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-[#b68a71] text-white" : "bg-gray-200 text-black"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex p-3 border-t border-[#b68a71] bg-white">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
            />
            <button onClick={() => sendMessage(input)} className="ml-2 bg-[#b68a71] text-white px-4 py-2 rounded-lg">Send</button>
            <button onClick={resetChat} className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-lg">Reset</button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-[#b68a71] text-white px-4 py-2 rounded-lg shadow-lg">Open Chat</button>
      )}
    </div>
  );
};

export default ChatbotUI;

