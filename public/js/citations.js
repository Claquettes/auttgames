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
});

joinbutton.addEventListener("click", () => {
    socket.emit('join room');
});

socket.on('display room', (room, players) => {
    waitingRoom.classList.remove('d-none');
    document.getElementById("lobby").classList.add('d-none');
    listPlayer(room, players);
    console.log(players);
});

function listPlayer(room, players) {
    let html = "";
    for (let i = 0; i < players.length; i++) {
        if (players[i].roomId === room.id) {
            html += `<div class="player"><img class="avatar" src="${players[i].avatar}" alt="avatar"> <p class="username">` + players[i].username + `${(players[i].owner) ? " 👑" : ""}`+"</p></div>";
        }
    }
    document.getElementById("playersList").innerHTML = html;
}