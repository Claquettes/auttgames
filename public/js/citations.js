const socket = io("/citations");

socket.emit('connection');
socket.on('get rooms', (rooms) => {
    console.log(rooms);
});

const createbutton = document.getElementById('createButton');
const joinbutton = document.getElementById('joinButton');
const startbutton = document.getElementById('startButton');

const gamecontainer = document.getElementById('gameContainer');
const waitingRoom = document.getElementById('waitingRoom');


createbutton.addEventListener("click", () => {
    socket.emit('create room');
});

joinbutton.addEventListener("click", () => {
    socket.emit('join room');
});

startbutton.addEventListener("click", () => {
    socket.emit('start game');
});


socket.on('display room', (room, owner) => {
    console.log(owner);
    waitingRoom.classList.remove('d-none');
    document.getElementById("lobby").classList.add('d-none');
    let html = "";
    for (let i = 0; i < room.players.length; i++) {
        html += `<div class="player"><img class="avatar" src="${room.players[i].avatar}" alt="avatar"> <p class="username">` + room.players[i].username + `${(room.players[i].owner) ? " 👑" : ""}`+"</p></div>";
    }
    document.getElementById("playersList").innerHTML = html;
    if (owner) {
        startbutton.classList.remove('d-none');
    }
    console.log(room.players);
});
