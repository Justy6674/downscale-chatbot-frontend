import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const categories = {
  "📊 Body Metrics": [
    "BMI Analysis",
    "Macro Analysis",
    "Calorie Goals",
    "Waist Metrics"
  ],
  "💊 Medications (🔒 Restricted Access)": [
    "Administration Videos",
    "Clinical Evidence",
    "Side Effect Management"
  ],
  "🍎 Nutrition & Meal Planning": [
    "Recipes",
    "Protein Sources",
    "Supplements & Nutrition Guides",
    "Diet Planners",
    "Water Reminder"
  ],
  "🏋️ Fitness & Activity": [
    "Home Resistance Workouts",
    "Office Exercise Routines",
    "Complete Training Programmes",
    "AI-Personalised Plans"
  ],
  "🧠 Mental Health & Sleep": [
    "Mindfulness Activities",
    "Binge Eating Disorder Screen",
    "Sleep Optimisation",
    "AI Stress Coaching"
  ]
};

function ChatbotUI() {
  const [messages, setMessages] = useState([{ text: "Hi! How can I assist you today?", sender: "ai" }]);
  const [input, setInput] = useState("");
  const [loadedCategories, setLoadedCategories] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < Object.keys(categories).length) {
        setLoadedCategories((prev) => [...prev, Object.keys(categories)[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

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
    <div className="w-full h-screen flex items-center justify-center bg-[#f7f2d3] p-6">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border border-[#b68a71]">
        <h1 className="text-xl font-bold text-[#b68a71] text-center">Downscale AI Assistant</h1>
        <h2 className="text-sm text-gray-700 text-center italic mb-4">Meet AbeAI, your personal health and wellness guide.</h2>

        {/* Chat Window */}
        <div className="h-64 overflow-auto border border-[#b68a71] bg-white p-3 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <span className={msg.sender === "user" ? "bg-[#b68a71] text-white p-2 rounded-lg" : "bg-gray-300 p-2 rounded-lg"}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Category Selections */}
        <div className="w-full flex flex-col space-y-3 mt-4">
          {loadedCategories.map((category, idx) => (
            categories[category] ? ( // ✅ Prevents undefined category errors
              <div key={idx} className="opacity-0 animate-fade-in">
                <h3 className="text-[#b68a71] font-bold text-md text-center">{category}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories[category].map((option) => (
                    <button
                      key={option}
                      onClick={() => sendMessage(option)}
                      className="bg-white text-[#b68a71] px-4 py-2 rounded-lg border border-[#b68a71] hover:bg-[#b68a71] hover:text-white transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : null
          ))}
        </div>

        {/* Text Input */}
        <div className="flex w-full mt-4">
          <input  
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow border border-[#b68a71] rounded-lg p-3 bg-white text-lg focus:ring-2 focus:ring-[#b68a71]"
          />
          <button onClick={() => sendMessage(input)} className="ml-2 bg-[#b68a71] text-white px-4 py-2 rounded-lg hover:bg-[#a0745f] transition-all">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotUI;

