import { useState } from "react";
import "./index.css";

const categories = {
  "📊 Body Metrics": ["BMI Analysis", "Macro Analysis", "Calorie Goals", "Waist Metrics"],
  "💊 Medications (🔒 Restricted Access)": ["Administration Videos", "Clinical Evidence", "Side Effect Management"],
  "🍎 Nutrition & Meal Planning": ["Recipes", "Protein Sources", "Supplements & Nutrition Guides", "Diet Planners", "Water Reminder"],
  "🏋️ Fitness & Activity": ["Home Resistance Workouts", "Office Exercise Routines", "Complete Training Programmes", "AI-Personalised Plans"],
  "🧠 Mental Health & Sleep": ["Mindfulness Activities", "Binge Eating Disorder Screen", "Sleep Optimisation", "AI Stress Coaching"]
};

function ChatbotUI() {
  const [messages, setMessages] = useState([{ text: "Hi! How can I assist you today?", sender: "ai" }]);
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
    <div className="fixed bottom-5 right-5 w-[400px]">
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg border border-[#b68a71] flex flex-col">
          {/* Header Bar */}
          <div className="bg-[#b68a71] text-white p-3 rounded-t-lg flex justify-between items-center">
            <h1 className="text-lg font-bold">Downscale AI Assistant</h1>
            <button onClick={() => setIsOpen(false)} className="text-white font-bold">✖</button>
          </div>

          {/* Chat Window */}
          <div className="h-72 overflow-auto bg-white p-3 flex flex-col space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span className={msg.sender === "user" ? "bg-[#b68a71] text-white p-3 rounded-xl" : "bg-gray-300 p-3 rounded-xl"}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Category Buttons */}
          <div className="w-full flex flex-col space-y-3 p-3">
            {Object.entries(categories).map(([category, options]) => (
              <div key={category} className="text-center">
                <h3 className="text-[#b68a71] font-bold text-md">{category}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => sendMessage(option)}
                      className="bg-white text-[#b68a71] px-4 py-2 rounded-full border border-[#b68a71] hover:bg-[#b68a71] hover:text-white transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box & Reset Button */}
          <div className="flex w-full p-3 border-t border-[#b68a71]">
            <input  
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-grow border border-[#b68a71] rounded-lg p-3 bg-white text-lg"
            />
            <button onClick={() => sendMessage(input)} className="ml-2 bg-[#b68a71] text-white px-4 py-3 rounded-lg">
              Send
            </button>
            <button onClick={resetChat} className="ml-2 bg-red-500 text-white px-4 py-3 rounded-lg">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotUI;

