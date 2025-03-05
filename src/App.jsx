import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const categories = {
  "📊 Body Metrics": [
    "BMI Analysis",
    "Macro Analysis",
    "Calorie Goals",
    "Waist Metrics"
  ],
  "💊 Medications (🔒 Paid Access)": [
    "Administration Videos ($4.99)",
    "Clinical Evidence ($9.99)",
    "Side Effect Management ($6.99)"
  ],
  "🍎 Nutrition & Meal Planning": [
    "Recipes (Free & Premium)",
    "Protein Sources",
    "Supplements & Affiliate Store",
    "Diet Planners ($14.99)",
    "Water Reminder"
  ],
  "🏋️ Fitness & Activity": [
    "Home Resistance Workouts",
    "Office Exercise Routines",
    "Complete Training Programmes ($99)",
    "AI-Personalised Plans ($49/month)"
  ],
  "🧠 Mental Health & Sleep": [
    "Mindfulness Activities",
    "Binge Eating Disorder Screen",
    "Sleep Optimisation",
    "AI Stress Coaching ($29.99/month)"
  ]
};

function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#f7f2d3] p-6">
      <h1 className="text-4xl font-bold text-[#b68a71] mb-4">AI Chatbot</h1>
      <p className="text-lg mb-6 text-gray-700">
        Please enter your question below or select from the premium coaching options.
      </p>

      <div className="w-full max-w-3xl h-96 overflow-auto border border-[#b68a71] bg-white p-4 rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={msg.sender === "user" ? "bg-[#b68a71] text-white p-2 rounded-lg" : "bg-gray-300 p-2 rounded-lg"}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl my-6">
        {Object.entries(categories).map(([category, options]) => (
          <div key={category} className="mb-4">
            <h3 className="text-[#b68a71] font-bold text-lg mb-2">{category}</h3>
            <div className="grid grid-cols-2 gap-2">
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
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-3xl">
        <input  
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-grow border rounded-lg p-3 bg-white text-lg"
        />
        <button onClick={() => sendMessage(input)} className="ml-2 bg-[#b68a71] text-white px-6 py-3 rounded-lg hover:bg-[#a0745f] transition-all text-lg">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatbotUI;

