const socket = io("/citations");

socket.emit('connection');
socket.on('get rooms', (rooms) => {
  console.log(rooms);
});

const createbutton = document.getElementById('createButton');
const joinbutton = document.getElementById('joinButton');

const gamecontainer = document.getElementById('gameContainer');
const waitingRoom = document.getElementById('waitingRoom');


createbutton.addEventListener("click", () => {
  socket.emit('create room');
  waitingRoom.classList.remove('d-none');
  createbutton.classList.add('d-none');
  joinbutton.classList.add('d-none');
});

joinbutton.addEventListener("click", () => {
  socket.emit('join room');
  waitingRoom.classList.remove('d-none');
  createbutton.classList.add('d-none');
  joinbutton.classList.add('d-none');
});  

socket.on('get rooms', (rooms) => {
  document.getElementById("hostname").innerHTML = "Host de la partie : "+rooms[0].owner;
});

socket.on('get players', (players, id) => {
  let html = "";
  for (i = 0; i < players.length; i++) {
    if (players[i].roomId === id) {
      html += players[i].username;
    }
  }  
  document.getElementById("playersList").innerHTML = html;
  console.log(players);
});

socket.on('already connected', (room, players) => {
  waitingRoom.classList.remove('d-none');
  createbutton.classList.add('d-none');
  joinbutton.classList.add('d-none');
  document.getElementById("hostname").innerHTML = "Host de la partie : " + room.owner;
  let html = "";
  for (let i = 0; i < players.length; i++) {
    if (players[i].roomId === room.id) {
      html += '<div class="player"><img class="avatar" src="https://cdn.discordapp.com/attachments/725671112658255895/1045028468024410212/images.png" alt="avatar"> <p class="username">' + players[i].username + "</p></div>";
    }
  }
  document.getElementById("playersList").innerHTML = html;
  console.log(players);
});