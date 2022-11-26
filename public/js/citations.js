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

const screen = document.getElementById('screen');

const endGame = document.getElementById('endGame');


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

socket.on('new citation', (citation) => {
    waitingRoom.classList.add('d-none');
    gamecontainer.classList.remove('d-none');
    screen.innerHTML = `<p>${citation}</p>`;
    document.getElementById("answer").value = "";
    setTimeout(() => {
        socket.emit('answer', document.getElementById('answer').value);
      }, 10000)
});

socket.on('end game', () => {
    gamecontainer.classList.add('d-none');
    endGame.classList.remove('d-none');
    console.log("end game");
});

