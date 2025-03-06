document.getElementById("send-btn").addEventListener("click", function () {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;
  appendMessage(userInput, "user");
  fetch("https://downscale-chatbot-backend.vercel.app/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput }),
  })
    .then(response => response.json())
    .then(data => appendMessage(data.reply, "ai"))
    .catch(() => appendMessage("Sorry, an error occurred.", "ai"));
  document.getElementById("user-input").value = "";
});

function appendMessage(message, sender) {
  const chatContainer = document.getElementById("chat-container");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("p-3", "rounded-lg", "shadow-sm", "max-w-[80%]");
  if (sender === "user") {
    messageDiv.classList.add("bg-[#b68a71]", "text-white", "self-end");
  } else {
    messageDiv.classList.add("bg-[#f7f2d3]", "text-[#1f1f1f]", "self-start");
  }
  messageDiv.textContent = message;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

