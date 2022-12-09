//on récupère la valeur de la longueur du côté du plateau de jeu, entrée par le joueur
const sideLength = Number(prompt('Entre la taille de la grille (entre 2 et 10)'));
if (sideLength < 2 || sideLength > 10) {
  alert('Taille non conforme');
  throw new Error('Invalid side length');
}

function calculTaille(){
  var taille = 599/sideLength;
  //on applique cette taille à chaque case du plateau de jeu
  var cases = document.getElementsByClassName("tile");

  for (var i = 0; i < cases.length; i++) { // on parcours toutes les cases afin de changer leur taille
    cases[i].style.width = taille+"px";
    cases[i].style.height = taille+"px";
    cases[i].style.lineHeight = taille+"px";
    cases[i].style.fontSize = taille/2+"px";
  }
}

const score = document.querySelector('.score'); //on récupère la classe "score" du css
const nbTiles = sideLength * sideLength;  
const board = document.querySelector('.board');
const tiles = [...Array(nbTiles)].map((_, i) => { //on créé les cases dans l'array
  const tile = document.createElement('div');     //on remplit la board avec des cases de valeur 0
  tile.classList.add('tile');
  tile.textContent = '0';
  board.appendChild(tile);
  return tile;
});


function addTile() {                              //fonction qui rajoute des tiles à chaque nouveau tour
  const emptyTiles = tiles.filter(tile => tile.textContent === '0');
  if (emptyTiles.length === 0){
    alert("Game Over");
    return;
  }; // plus de place, le jeu est fini

  const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  randomTile.textContent = Math.random() < 0.9 ? 2 : 4;
}
function colorTiles() //fonction qui applique la couleur à chaque Tile 
{
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    const value = Number(tile.textContent);
    tile.classList.remove('tile-0','tile-2', 'tile-4', 'tile-8', 'tile-16', 'tile-32', 'tile-64', 'tile-128', 'tile-256', 'tile-512', 'tile-1024', 'tile-2048');
    if (value > -1) {
      tile.classList.add(`tile-${value}`);
    }
  }
}

 
  

function moveTiles(direction) {

let xModifier = 0;
let yModifier = 0;
if (direction === 'left') {
xModifier = -1;
} else if (direction === 'up') {
yModifier = -1;
} else if (direction === 'right') {
xModifier = 1;
} else if (direction === 'down') {
yModifier = 1;
}


for (let y = 0; y < sideLength; y++) {
for (let x = 0; x < sideLength; x++) {
  const index = x + y * sideLength;
  const tile = tiles[index];
  let newX = x + xModifier;
  let newY = y + yModifier;
  while (newX >= 0 && newX < sideLength && newY >= 0 && newY < sideLength) {
    const newIndex = newX + newY * sideLength;
    const newTile = tiles[newIndex];
    if (newTile.textContent === '0') {
      // Move the tile to the empty space
      newTile.textContent = tile.textContent;
      tile.textContent = '0';
      newX += xModifier;
      newY += yModifier;
    } else if (newTile.textContent === tile.textContent) {
      // Merge the tiles

      newTile.textContent = String(Number(newTile.textContent) * 2);
      tile.textContent = '0';
      score.textContent = String(Number(score.textContent) + Number(newTile.textContent));
      break;
    } else {
      // Stop moving the tile if it can't be merged or moved to an empty space
      break;
    }
  }
}
}

// Add a new tile to the game board
  addTile();

  colorTiles();
}

// Handle keyboard input
document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 37: // left arrow
      moveTiles('left');
      break;
    case 38: // up arrow
      moveTiles('up');
      break;
    case 39: // right arrow
      moveTiles('right');
      break;
    case 40: // down arrow
      moveTiles('down');
      break;
  }
});

//Initialisation du jeu, on calcule la taille, on ajoute 2 tiles, on ajoute la couleur, et on initialise le score.
calculTaille();
addTile();
addTile();
colorTiles();
score.textContent = '0';