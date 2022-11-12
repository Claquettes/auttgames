//declaration du joueur, obstacle, et du trigger pour le nombre d'obstacles passés
const obstacleBaseOffset = document.getElementById("game").clientWidth; // décalage de l'obstacle au début du jeu

var character = document.getElementById("character");
var obstacleContainer = document.getElementById("obstacle-container");

let score = 0;
let temps = 440;
let speed = 6; // px/10ms
let clock = 0; //en secondes

let obstacles = [];

// fonction qui fait sauter à l'input
function jump() {
    if (character.classList != "playAnimation") {
        character.classList.add("playAnimation");
        setTimeout(function () {
            character.classList.remove("playAnimation");
        }, 500);
    }
}

let addNewObstacle = function () {
    let newObstacle = document.createElement("div");
    newObstacle.classList.add("obstacle");
    obstacleContainer.appendChild(newObstacle);
    obstacles.push(newObstacle);
    return newObstacle;
}

let resetObstacle = function (obs) {
    obs.style.left = obstacleBaseOffset + "px";
}

// procédure pour animer un obstacle
let obstacleAnim = function (obs) {
    if (obs.style.left == '')
        resetObstacle(obs)

    let currentOffset = parseInt(obs.style.left.replace("px", ""));
    let newOffset = (currentOffset - speed <= -40) ? obstacleBaseOffset : currentOffset - speed;
    obs.style.left = newOffset + "px";
};

// boucle principale du jeu pour vérifier si on a perdu, compter le score, animer les obstacles...
var gameLoop = setInterval(function () {
    obstacles.forEach((obs, idx) => {
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); //recupère la valeur sur l'axe y du char//
        var blockLeft = parseInt(window.getComputedStyle(obs).getPropertyValue("left")); //recupère la valeur sur l'axe x du block//

        // On vérifie si on a perdu
        if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
            obstacles.splice(idx, 1); // on cancel l'animation

            alert("Tu as perdu sale Fraude rafraichi la page pour rejouer, et ton Score était: " + (score));
            clearInterval(gameLoop);
        }

        // On check si on a jump au dessus d'un bloc
        if (blockLeft < 0) {
            score++;

            obstacles.splice(obstacles.indexOf(obs), 1); // on cancel l'animation
            obs.remove();

        }

        // On anime l'obstacle
        obstacleAnim(obs)

        document.getElementsByClassName("scoretexte")[0].innerHTML = (parseInt(score));
    })
}, 10);

// on lance le jeu :
let ob = setInterval(function () {
    // on créer un nouvel obstacle tout à droite de l'écran toutes les 2 secondes
    addNewObstacle()
    //TODO change speed
}, 2000);


// Horloge qui augmente la clock toutes les secondes
var timer = setInterval(function () {
    clock++;
}, 1000);

// procédure qui augmente la vitesse de l'obstacle toutes les 10 secondes d'une quantité aléatoire, jusqu'a 10 de speed
var changeSpeed = setInterval(function () {
    if (clock >= 10) {
        if (speed < 10) {
            speed = speed + (Math.random());
            clock = 0;
            console.log(speed);
        }
    }
}, 750);


