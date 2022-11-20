const socket = io("/citations");

socket.emit('connection');
socket.on('get rooms', (rooms) => {
  console.log(rooms);
});

document.getElementById("createButton").addEventListener("click", () => {
  socket.emit('create room', Math.random().toString(10).substring(2, 2 + 9));
});