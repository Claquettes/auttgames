const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const imageContainer = document.getElementById("image-container");
const divGrass = document.getElementById("grass");
const divWater = document.getElementById("water");
const divCliff = document.getElementById("cliff");
const sc = document.getElementsByClassName("s-container");



const tileSize = 40;
let currentImage = 0;

erase = false;


const images = [
    "/assets/tiles/tile001.png",
    "/assets/tiles/tile002.png",
    "/assets/tiles/tile003.png",
    "/assets/tiles/tile004.png",
    "/assets/tiles/tile005.png",
    "/assets/tiles/tile006.png",
    "/assets/tiles/tile007.png",
    "/assets/tiles/tile008.png",
    "/assets/tiles/tile009.png",
    "/assets/tiles/tile010.png",
    "/assets/tiles/tile011.png",
    "/assets/tiles/tile012.png",
    "/assets/tiles/tile013.png",
    "/assets/tiles/tile014.png",
    "/assets/tiles/tile015.png",
    "/assets/tiles/tile016.png",
    "/assets/tiles/tile017.png",
    "/assets/tiles/tile018.png",
    "/assets/tiles/tile019.png",
    "/assets/tiles/tile020.png",
    "/assets/tiles/tile021.png",
    "/assets/tiles/tile022.png",
    "/assets/tiles/tile023.png",
    "/assets/tiles/tile024.png",
    "/assets/tiles/tile025.png",
    "/assets/tiles/tile026.png",
    "/assets/tiles/tile027.png",
    "/assets/tiles/tile028.png",
    "/assets/tiles/tile029.png",
    "/assets/tiles/tile030.png",
    "/assets/tiles/tile031.png",
    "/assets/tiles/tile032.png",
    "/assets/tiles/tile033.png",
    "/assets/tiles/tile034.png",
    "/assets/tiles/tile035.png",
    "/assets/tiles/tile036.png",
    "/assets/tiles/tile037.png",
    "/assets/tiles/tile038.png",
    "/assets/tiles/tile039.png",
    "/assets/tiles/tile040.png",
    "/assets/tiles/tile041.png",
    "/assets/tiles/tile042.png",
    "/assets/tiles/tile043.png",
    "/assets/tiles/tile044.png",
    "/assets/tiles/tile045.png",
    "/assets/tiles/tile046.png",
    "/assets/tiles/tile047.png",
    "/assets/tiles/tile048.png",
    "/assets/tiles/tile049.png",
    "/assets/tiles/tile050.png",
    "/assets/tiles/tile051.png",
    "/assets/tiles/tile057.png",
    "/assets/tiles/tile058.png",
    "/assets/tiles/tile059.png",
    "/assets/tiles/tile060.png",
    "/assets/tiles/tile061.png",
    "/assets/tiles/tile062.png",
    "/assets/tiles/tile063.png",
    "/assets/tiles/tile064.png",
    "/assets/tiles/tile065.png",
    "/assets/tiles/tile066.png",
    "/assets/tiles/tile067.png",
    "/assets/tiles/tile068.png",
    "/assets/tiles/tile069.png",
    "/assets/tiles/tile070.png",
    "/assets/tiles/tile071.png",
    "/assets/tiles/tile072.png",
    "/assets/tiles/tile073.png",
    "/assets/tiles/tile074.png",
    "/assets/tiles/tile075.png",
    "/assets/tiles/tile076.png",
    "/assets/tiles/tile077.png",
    "/assets/tiles/tile078.png",
    "/assets/tiles/tile079.png",
    "/assets/tiles/tile080.png",
    "/assets/tiles/tile081.png",
    "/assets/tiles/tile082.png",
    "/assets/tiles/tile083.png",
    "/assets/tiles/tile084.png",
    "/assets/tiles/tile085.png",
    "/assets/tiles/tile086.png",
    "/assets/tiles/tile087.png",
    "/assets/tiles/tile088.png",
    "/assets/tiles/tile089.png",
    "/assets/tiles/tile090.png",
    "/assets/tiles/tile091.png",
    "/assets/tiles/tile092.png",
    "/assets/tiles/tile093.png",
    "/assets/tiles/tile094.png",
    "/assets/tiles/tile095.png",
    "/assets/tiles/tile096.png",
    "/assets/tiles/tile097.png",
    "/assets/tiles/tile098.png",
    "/assets/tiles/tile099.png",
    "/assets/tiles/tile100.png",
    "/assets/tiles/tile101.png",
    "/assets/tiles/tile102.png",
    "/assets/tiles/tile104.png",
    "/assets/tiles/tile112.png",
    "/assets/tiles/tile113.png",
    "/assets/tiles/tile114.png",
    "/assets/tiles/tile115.png",
    "/assets/tiles/tile116.png",
    "/assets/tiles/tile117.png",
    "/assets/tiles/tile118.png",
    "/assets/tiles/tile120.png",
    "/assets/tiles/tile122.png",
    "/assets/tiles/tile123.png",
    "/assets/tiles/tile124.png",
    "/assets/tiles/tile126.png",
    "/assets/tiles/tile127.png",
    "/assets/tiles/tile128.png",
    "/assets/tiles/tile129.png",
    "/assets/tiles/tile130.png",
    "/assets/tiles/tile131.png",
    "/assets/tiles/tile132.png",
    "/assets/tiles/tile134.png",
    "/assets/tiles/tile135.png",
    "/assets/tiles/tile136.png",
    "/assets/tiles/tile137.png",
    "/assets/tiles/tile138.png",
    "/assets/tiles/tile139.png",
    "/assets/tiles/tile140.png",
    "/assets/tiles/tile142.png",
    "/assets/tiles/tile143.png",
    "/assets/tiles/tile144.png",
    "/assets/tiles/tile145.png",
    "/assets/tiles/tile146.png",
    "/assets/tiles/tile147.png",
    "/assets/tiles/tile148.png",

];

let selectedImage;

for (let i = 0; i < canvas.width; i += tileSize) {
  for (let j = 0; j < canvas.height; j += tileSize) {
    ctx.rect(i, j, tileSize, tileSize);
  }
}

images.forEach((image) => {
  const img = new Image();
  currentImage = currentImage + 1;
  img.src = image;
  img.addEventListener("click", () => {
    selectedImage = image;
  });
  if (currentImage < 52) { //on met dans le span grass 
    divGrass.appendChild(img);
  } else if (currentImage < 99) { //on met dans le span water
    divWater.appendChild(img);
  } else if (currentImage < 168) { //on met dans le span cliff
    divCliff.appendChild(img);
  }  
});

canvas.addEventListener("click", (event) => {
  const x = Math.floor(event.offsetX / tileSize) * tileSize;
  const y = Math.floor(event.offsetY / tileSize) * tileSize;
  if (erase) { //on ne pose pas d'image, on efface
    ctx.clearRect(x, y, tileSize, tileSize);
  }

  if(selectedImage) {
    const image = new Image();
    image.src = selectedImage;
    image.onload = () => {
      ctx.drawImage(image, x, y, tileSize, tileSize);
    };
  }
});

//on met les fonctions des boutons ici
function clearButton() {
  //on demande confirmation
  if (confirm("Voulez-vous vraiment tout effacer ?")) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function eraserButton() {
  if(erase) { //si on est déjà en mode gomme, on désactive
    erase = false;
    //on remet la couleur du bouton à la normale
    document.getElementById("eraser").style.backgroundColor = "white";
  } else { //sinon on active le mode gomme
  selectedImage = null;
  erase = true;
  document.getElementById("eraser").style.backgroundColor = "red";
  }
}

function saveButton() {
  setTimeout(() => {
  const dataURL = canvas.toDataURL('image/png')
  const downloadLink = document.createElement('a');
  downloadLink.href = dataURL;
  downloadLink.download = 'canvas.png';
  downloadLink.click();
  }, 1000);
}

