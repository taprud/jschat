const socket = io();
const msgArea = document.getElementById('msgArea');
const msgText = document.getElementById('msgText');
const welcome = document.getElementById('welcome');
const audio = document.getElementById('audio');
const toggleSound = document.getElementById('toggleSound');
const toggleScroll = document.getElementById('toggleScroll');

const nick = welcome.innerText.slice(9);

function addMsg(str) {
  const newMsg = document.createElement('div');
  newMsg.innerText = str;
  msgArea.appendChild(newMsg);

  if(toggleScroll.checked)
    msgArea.scrollTop = msgArea.scrollHeight;
}

function playMsg() {
  if(toggleSound.checked)
    audio.play();
}

addMsg('You joined the chat.');

socket.emit('send-join', nick);

socket.on('join', nickjoin => {
  addMsg(nickjoin + " joined.");
  playMsg();
});

socket.on('msg', msg => {
  addMsg(msg.nick + ": " + msg.text);
  playMsg();
});

socket.on('leave', nickleft => {
  addMsg(nickleft + " left.");
  playMsg();
});

msgText.addEventListener('keydown', e => {
  if(e.which === 13 && event.shiftKey == false && msgText.value.trim()) {
    const text = msgText.value;

    e.preventDefault();
    addMsg(nick + ": " + text);

    socket.emit('send-msg', {
      nick,
      text
    });

    msgText.value = '';
  }
});