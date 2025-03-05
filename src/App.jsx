import { useState } from "react";
import { createRoot } from "react-dom/client";

const categories = {
  "🩺 Health & Wellness": ["Body Metrics", "Medication Management", "Mindfulness & Sleep"],
  "🍽 Nutrition & Diet": ["Meal Planning", "Calorie Tracking", "Hydration Reminder"],
  "💪 Fitness & Activity": ["Workout Guidance", "Exercise Scheduling", "Progress Tracking"],
  "🧠 Mental & Lifestyle": ["Emotional Eating Support", "Daily Affirmations", "Goal Setting"]
};

function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-[#b68a71] text-white p-5 rounded-full shadow-lg text-lg hover:bg-[#a0745f] transition-all"
        >
          💬 AI Coach
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 bg-[#f7f2d3] p-5 rounded-lg shadow-xl w-[400px] border border-[#b68a71] font-[OpenSans]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-[#b68a71]">AI Coach</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-600 text-xl">✖</button>
          </div>
          <div className="h-64 overflow-auto border-b pb-2">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <span className={msg.sender === "user" ? "bg-[#b68a71] text-white p-2 rounded-lg" : "bg-gray-300 p-2 rounded-lg"}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 my-3">
            {Object.entries(categories).map(([category, options]) => (
              <div key={category}>
                <h3 className="text-[#b68a71] font-bold mb-1">{category}</h3>
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => sendMessage(option)}
                    className="bg-[#b68a71] text-white px-3 py-2 rounded-lg w-full hover:bg-[#a0745f] transition-all mb-1"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="flex mt-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-grow border rounded-lg p-2 bg-white"
            />
            <button onClick={() => sendMessage(input)} className="ml-2 bg-[#b68a71] text-white px-4 py-2 rounded-lg hover:bg-[#a0745f] transition-all">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function injectChatbot() {
  const chatContainer = document.createElement("div");
  chatContainer.id = "chatbot-container";
  document.body.appendChild(chatContainer);
  createRoot(chatContainer).render(<ChatbotUI />);
}

injectChatbot();
import { useState } from "react";
import { createRoot } from "react-dom/client";

const categories = {
  "🩺 Health & Wellness": ["Body Metrics", "Medication Management", "Mindfulness & Sleep"],
  "🍽 Nutrition & Diet": ["Meal Planning", "Calorie Tracking", "Hydration Reminder"],
  "💪 Fitness & Activity": ["Workout Guidance", "Exercise Scheduling", "Progress Tracking"],
  "🧠 Mental & Lifestyle": ["Emotional Eating Support", "Daily Affirmations", "Goal Setting"]
};

function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-[#b68a71] text-white p-5 rounded-full shadow-lg text-lg hover:bg-[#a0745f] transition-all"
        >
          💬 AI Coach
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 bg-[#f7f2d3] p-5 rounded-lg shadow-xl w-[400px] border border-[#b68a71] font-[OpenSans]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-[#b68a71]">AI Coach</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-600 text-xl">✖</button>
          </div>
          <div className="h-64 overflow-auto border-b pb-2">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <span className={msg.sender === "user" ? "bg-[#b68a71] text-white p-2 rounded-lg" : "bg-gray-300 p-2 rounded-lg"}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 my-3">
            {Object.entries(categories).map(([category, options]) => (
              <div key={category}>
                <h3 className="text-[#b68a71] font-bold mb-1">{category}</h3>
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => sendMessage(option)}
                    className="bg-[#b68a71] text-white px-3 py-2 rounded-lg w-full hover:bg-[#a0745f] transition-all mb-1"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="flex mt-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-grow border rounded-lg p-2 bg-white"
            />
            <button onClick={() => sendMessage(input)} className="ml-2 bg-[#b68a71] text-white px-4 py-2 rounded-lg hover:bg-[#a0745f] transition-all">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function injectChatbot() {
  const chatContainer = document.createElement("div");
  chatContainer.id = "chatbot-container";
  document.body.appendChild(chatContainer);
  createRoot(chatContainer).render(<ChatbotUI />);
}

injectChatbot();

