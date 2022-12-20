const socket = io("/citations");

socket.emit('connection');

const createbutton = document.getElementById('createButton');
const joinbutton = document.getElementById('joinButton');
const startbutton = document.getElementById('startButton');
const copyButton = document.getElementById('copyButton');

const gamecontainer = document.getElementById('gameContainer');
const waitingRoom = document.getElementById('waitingRoom');

const screen = document.getElementById('screen');

const endGame = document.getElementById('endGame');
const answerTable = document.getElementById('answerTable');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get('room');
console.log(roomId);

if (roomId) {
    socket.emit('join room', roomId);
}


createbutton.addEventListener("click", () => {
    socket.emit('create room');
});

joinbutton.addEventListener("click", () => {
    socket.emit('join room', roomId);
});

startbutton.addEventListener("click", () => {
    socket.emit('start game');
});

copyButton.addEventListener("click", () => {
    let text = window.location.href + "?room=" + roomId;
    navigator.clipboard.writeText(text).then(() => {
        alert("Texte copié !")
    })
});


socket.on('display room', (room, owner) => {
    roomId = room.id;
    waitingRoom.classList.remove('d-none');
    document.getElementById("lobby").classList.add('d-none');
    let html = "";
    for (let i = 0; i < room.players.length; i++) {
        html += `<div class="player"><img class="avatar" src="${room.players[i].avatar}" alt="avatar"> <p class="username">` + room.players[i].username + `${(room.players[i].owner) ? " 👑" : ""}` + "</p></div>";
    }
    document.getElementById("playersList").innerHTML = html;
    if (owner) {
        startbutton.classList.remove('d-none');
    }
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

socket.on('end game', (room, answer) => {
    gamecontainer.classList.add('d-none');
    endGame.classList.remove('d-none');
    console.log("end game");
    console.log('room', room);
    refreshAnswer(room, answer);
});

function refreshAnswer(room, answer, owner) {
    let text = `
    <table id="answerTable">
        <thead>
            <tr>
            <th>${answer.citation}</th> 
            <th>${answer.author}</th>
            <th>${answer.date}</th>
            </tr>
        </thead>
        <tbody>`;
    for (let i = 0; i < room.players.length; i++) {
        text += `
        <tr>
            <td>${room.players[i].username}</td>
            <td>${room.players[i].answers[0]}</td>
            <td><input type="checkbox" id="answer_${i}"></td>
        </tr>`;
    }
    text += `</tbody>
    </table>`;
    answerTable.innerHTML = text;   
}