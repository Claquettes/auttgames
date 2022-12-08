
const score = document.querySelector('.score');

const board = document.querySelector('.board');
const tiles = [...Array(16)].map((_, i) => {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.textContent = '0';
  board.appendChild(tile);
  return tile;
});


function addTile() {
  const emptyTiles = tiles.filter(tile => tile.textContent === '0');
  if (emptyTiles.length === 0){
    alert("Game Over");
    return;
  }; // no empty tiles, game is over

  const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  randomTile.textContent = Math.random() < 0.9 ? 2 : 4;
}
function colorTiles() /*the function that colors the tiles according to their value in the css file 2048.css */ 
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


for (let y = 0; y < 4; y++) {
for (let x = 0; x < 4; x++) {
  const index = x + y * 4;
  const tile = tiles[index];
  let newX = x + xModifier;
  let newY = y + yModifier;
  while (newX >= 0 && newX < 4 && newY >= 0 && newY < 4) {
    const newIndex = newX + newY * 4;
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

// Start the game
addTile();
addTile();
colorTiles();
score.textContent = '0';