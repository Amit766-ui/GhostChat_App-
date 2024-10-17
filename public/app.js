const socket = io();

const chatWindow = document.getElementById('chatWindow');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const sender = prompt("Enter your name:", "User");

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = messageInput.value.trim();
  if (message === '') return;

  appendMessage(message, 'sent');
  socket.emit('send-chat-message', { message: message, sender: sender });
  messageInput.value = '';
}

socket.on('chat-message', (data) => {
  appendMessage(`${data.sender}: ${data.message}`, 'received');
});

function appendMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.innerText = message;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
