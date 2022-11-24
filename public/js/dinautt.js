const obstacleBaseOffset = document.getElementById("game").clientWidth; // décalage de l'obstacle au début du jeu

let character = document.getElementById("character");
let obstacleContainer = document.getElementById("obstacle-container");
let obstacleContainerHaut = document.getElementById("obstacle-containerHaut");

let score = 0;
let classeObstacle = 0;
let temps = 440;
let speed = 6; // px/10ms
let clock = 0; //en secondes
let gravityPosition = -1; // -1 = bas, 1 = haut; -1 par defaut NE METTEZ PAS 0! on se sert de la valeur negative pour inverser les animations

let obstacles = [];

// fonction qui fait sauter à l'input
function jump() {
    //si le personnage est en bas, on le fait sauter
    if (gravityPosition === -1) {
        if (!character.classList.contains("playAnimation")) {
            character.classList.add("playAnimation");

            setTimeout(function () {
                character.classList.remove("playAnimation");
            }, 500);
        }
    } else {   //si le personnage est en haut, on le fait descendre
        if (character.classList != "playAnimationJumpInverse") {
            character.classList.add("playAnimationJumpInverse");

            setTimeout(function () {
                character.classList.remove("playAnimationJumpInverse");
            }, 500);
        }
    }
}

//fonction qui inverse la gravité
let changeGravity = function () {
    if (gravityPosition === -1) {
        if (!character.classList.contains("playAnimationDownToUp")) {
            character.classList.add("playAnimationDownToUp");

            setTimeout(function () {
                character.classList.remove("playAnimationDownToUp");
                //on fait une rotation de 180°
                character.style.transform = "rotate(180deg)";
            }, 500);
            gravityPosition *= -1; //1 = haut, -1 = bas
        }
    } else {
        if (!character.classList.contains("playAnimationUpToDown")) {
            character.classList.add("playAnimationUpToDown");

            setTimeout(function () {
                character.classList.remove("playAnimationUpToDown");
                //on fait une rotation de 180°
                character.style.transform = "rotate(0deg)";
            }, 500);
            gravityPosition *= -1; //1 = haut, -1 = bas
        }
    }
}

//fonction qui maintient le personage si la gravité est inversée
let gravityHandler = function () {
    if (gravityPosition === 1) {
        document.getElementById("character").style.top = "0px";
    } else {
        document.getElementById("character").style.top = "150px";
    }
}

//fonction qui fait sauter si on appuie sur la barre espace et renverse la gravité si on appuie sur la touche "arrow up"
var keyHandler = function (e) {
    if (e.key === "ArrowUp") {
        changeGravity();
    }

    if (e.key === " ") {
        jump();
    }

};

//fonction qui créé un obstacle
let addNewObstacle = function () {
    let newObstacle = document.createElement("div");
    //on varie les styles d'obstacles, on genere un nombre aleatoire entre 0 et 1
    let taille = Math.random();
    let position = Math.random();

    if (taille < 0.5) {
        //l'obstacle fait la taille normale
        newObstacle.classList.add("obstacle");
        if (position < 0.5) {
            //l'obstacle est en bas
            obstacleContainer.appendChild(newObstacle);
            newObstacle.classList.add("obstacleBas");
        } else {
            //l'obstacle est en haut
            obstacleContainerHaut.appendChild(newObstacle);
            newObstacle.classList.add("obstacleHaut");
        }
    } else {
        //l'obstacle est plus haut
        newObstacle.classList.add("obstaclePlusHaut");
        if (position < 0.5) {
            //l'obstacle est en bas
            obstacleContainer.appendChild(newObstacle);
            newObstacle.classList.add("obstacleBas");
        } else {
            //l'obstacle est en haut
            obstacleContainerHaut.appendChild(newObstacle);
            newObstacle.classList.add("obstacleHaut");
        }
    }
    //on pousse l'obstacle de droite à gauche
    obstacles.push(newObstacle);
    return newObstacle;
};

//procédure pour reset un obstacle
let resetObstacle = function (obs) {
    obs.style.left = obstacleBaseOffset + "px";
}

// procédure pour animer un obstacle
let obstacleAnim = function (obs) {
    if (obs.style.left === '')
        resetObstacle(obs);
    let currentOffset = parseInt(obs.style.left.replace("px", ""));
    let newOffset = (currentOffset - speed <= -40) ? obstacleBaseOffset : currentOffset - speed;
    obs.style.left = newOffset + "px";
};

// boucle principale du jeu pour vérifier si on a perdu, compter le score, animer les obstacles...
let gameLoop = setInterval(function () {
    obstacles.forEach((obs, idx) => {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); //recupère la valeur sur l'axe y du char//
        let blockLeft = parseInt(window.getComputedStyle(obs).getPropertyValue("left")); //recupère la valeur sur l'axe x du block//

        function perdu() {
            console.log("perdu");
            clearInterval(gameLoop);
            obstacles.splice(idx, 1); // on cancel l'animation de l'obstacle
            alert("Tu as perdu sale Fraude rafraichi la page pour rejouer, et ton Score était: " + (score));
        }

        // On vérifie si on a perdu
        if (blockLeft < 20 && blockLeft > 0) {  //quand le bloc atteint la bordure

            if (characterTop <= 40) { //si le personnage est en haut
                if (obs.classList.contains("obstacleHaut")) { //si le bloc est en haut
                    perdu();
                }
            }

            if (characterTop >= 125) { //si le personnage est en bas
                if (obs.classList.contains("obstacleBas")) { //si le bloc est en bas
                    perdu();
                }
            }

            if (characterTop >= 75) { //si le personnage est dans la première zone
                if ((obs.classList.contains("obstacleBas")) && (obs.classList.contains("obstaclePlusHaut"))) { //si le bloc est en bas
                    perdu();
                }

            }
            if (characterTop <= 75) { //si le personnage est dans la première zone
                if ((obs.classList.contains("obstacleHaut")) && (obs.classList.contains("obstaclePlusHaut"))) { //si le bloc est en bas
                    perdu();
                }

            }

        }
        if (blockLeft < 0) {
            score++;

            obstacles.splice(obstacles.indexOf(obs), 1); // on cancel l'animation
            obs.remove();
        }
        // On check la gravité pour repositionner le personnage au besoin
        gravityHandler();

        // On anime l'obstacle
        obstacleAnim(obs);
        // On affiche le score dans l'html, dans la div "scoretexte"
        document.getElementsByClassName("scoretexte")[0].innerHTML = (parseInt(score));
    })
}, 10);

// on lance le jeu :
let ob = setInterval(function () {
    // on créer un nouvel obstacle tout à droite de l'écran toutes les 2 secondes
    addNewObstacle()
    //TODO change speed
}, 2000);

//procédure qui check si on a appuyé sur une touche
let keyLooker = setInterval(function () {
    document.addEventListener("keydown", keyHandler);
}, 10);

// Horloge qui augmente la clock toutes les secondes
let timer = setInterval(function () {
    clock++;
}, 1000);

// procédure qui augmente la vitesse de l'obstacle toutes les 10 secondes d'une quantité aléatoire, jusqu'a 20 de speed
let changeSpeed = setInterval(function () {
    if (clock >= 7) {

        if (speed << 30) {
            speed = speed + (Math.random());
            clock = 0;
        }
    }
}, 750);
