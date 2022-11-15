const obstacleBaseOffset = document.getElementById("game").clientWidth; // décalage de l'obstacle au début du jeu

var character = document.getElementById("character");
var obstacleContainer = document.getElementById("obstacle-container");
var obstacleContainerHaut = document.getElementById("obstacle-containerHaut");

let score = 0;
let temps = 440;
let speed = 6; // px/10ms
let clock = 0; //en secondes
let gravityPosition = -1; // -1 = bas, 1 = haut; -1 par defaut NE METTEZ PAS 0! on se sert de la valeur negative pour inverser les animations

let obstacles = [];

// fonction qui fait sauter à l'input
function jump() {
    //si le personnage est en bas, on le fait sauter
    if (gravityPosition == -1){
        if (character.classList != "playAnimation") {
            character.classList.add("playAnimation");
            setTimeout(function () {
                character.classList.remove("playAnimation");
            }, 500);
    }}
    else{   //si le personnage est en haut, on le fait descendre
        if (character.classList != "playAnimationJumpInverse") {
            character.classList.add("playAnimationJumpInverse");
            setTimeout(function () {
                character.classList.remove("playAnimationJumpInverse");
            }, 500);
    }
}
}
//fonction qui inverse la gravité
let changeGravity =function () {
    if (gravityPosition == -1) {
    if (character.classList != "playAnimationDownToUp") {  
        character.classList.add("playAnimationDownToUp");
        setTimeout(function () {
            character.classList.remove("playAnimationDownToUp");
        //on fait une rotation de 180°
        character.style.transform = "rotate(180deg)";    
        }, 500);
            gravityPosition *= -1; //1 = haut, -1 = bas
    }
}
    else {
        if (character.classList != "playAnimationUpToDown") {
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
    if (gravityPosition == 1) {
    document.getElementById("character").style.top = "4px";
    }
    else {
    document.getElementById("character").style.top = "150px";
    }
   }
    
//fonction qui fait sauter si on appuie sur la barre espace et renverse la gravité si on appuie sur la touche "arrow up"
var keyHandler = function (e) {
    if (e.key == "ArrowUp") {
        changeGravity();
    }
    if (e.key == " ") {
        jump();
    }
    
};

//fonction qui créé un obstacle
let addNewObstacle = function () {
    let newObstacle = document.createElement("div");
    newObstacle.classList.add("obstacle");
    //on ajoute l'obstacle, soit en haut (newObstacleHaut), soit en bas (newObstacleBas)
    if(Math.random() < 0.5){
    obstacleContainer.appendChild(newObstacle);
    console.log("obstacle en bas");
    }
    else{
        obstacleContainerHaut.appendChild(newObstacle);
        console.log("obstacle en haut");
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
    if (obs.style.left == '')
        resetObstacle(obs);
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
        if (blockLeft < 20 && blockLeft > 0) {  //quand le bloc atteint la bordure

                if(gravityPosition == -1){ //si la gravité est normale
                  {if ((characterTop  <= 130) && (characterTop >=70)) {        //position basse idle: 150px //postion haute idle: 4px
                        console.log("obstacle passé");                       //on à passé l'obstacle
                    }
                    else {
                        console.log("perdu");
                        clearInterval(gameLoop);
                        obstacles.splice(idx, 1); // on cancel l'animation de l'obstacle
                        alert("Tu as perdu sale Fraude rafraichi la page pour rejouer, et ton Score était: " + (score));
                }}}

                else{ //si la gravité est inversée
                    if ((characterTop  >= 40) && (characterTop <=50)) {        //position basse idle: 150px //postion haute idle: 4px
                        console.log("obstacle passé");                       //on à passé l'obstacle
                    }
                    else {
                        console.log("perdu");
                        clearInterval(gameLoop);
                        obstacles.splice(idx, 1); // on cancel l'animation de l'obstacle
                        alert("Tu as perdu sale Fraude rafraichi la page pour rejouer, et ton Score était: " + (score));
                }}

                
            
        }
        // On check si on a jump au dessus d'un bloc
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
        document.getElementById("scoretexte").innerHTML = "Score: " + score;
        
        
    })
}, 10);

// on lance le jeu :
let ob = setInterval(function(){
    // on créer un nouvel obstacle tout à droite de l'écran toutes les 2 secondes
    addNewObstacle()
    //TODO change speed
}, 2000);

//procédure qui check si on a appuyé sur une touche
let keyLooker = setInterval(function () {
    document.addEventListener("keydown", keyHandler);
}, 10);

// Horloge qui augmente la clock toutes les secondes
var timer = setInterval(function(){
    clock++;
}, 1000);

// procédure qui augmente la vitesse de l'obstacle toutes les 10 secondes d'une quantité aléatoire, jusqu'a 20 de speed
var changeSpeed = setInterval(function(){
    if(clock>=10){
        if(speed<20){
            speed=speed+(Math.random());
            clock=0;
            console.log(speed);
        }
    }
}, 750);

Footer
