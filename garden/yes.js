const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const imageContainer = document.getElementById("image-container");
const divGrass = document.getElementById("grass");
const divWater = document.getElementById("water");
const divCliff = document.getElementById("cliff");
const divFlowers = document.getElementById("flower");
const sc = document.getElementsByClassName("s-container");
const fileInput = document.getElementById('gardenInput');

const tileSize = 40;
let currentImage = 0;

erase = false;

const images = [
    "/garden/assets/tiles/tile001.png",
    "/garden/assets/tiles/tile002.png",
    "/garden/assets/tiles/tile003.png",
    "/garden/assets/tiles/tile004.png",
    "/garden/assets/tiles/tile005.png",
    "/garden/assets/tiles/tile006.png",
    "/garden/assets/tiles/tile007.png",
    "/garden/assets/tiles/tile008.png",
    "/garden/assets/tiles/tile009.png",
    "/garden/assets/tiles/tile010.png",
    "/garden/assets/tiles/tile011.png",
    "/garden/assets/tiles/tile012.png",
    "/garden/assets/tiles/tile013.png",
    "/garden/assets/tiles/tile014.png",
    "/garden/assets/tiles/tile015.png",
    "/garden/assets/tiles/tile016.png",
    "/garden/assets/tiles/tile017.png",
    "/garden/assets/tiles/tile018.png",
    "/garden/assets/tiles/tile019.png",
    "/garden/assets/tiles/tile020.png",
    "/garden/assets/tiles/tile021.png",
    "/garden/assets/tiles/tile022.png",
    "/garden/assets/tiles/tile023.png",
    "/garden/assets/tiles/tile024.png",
    "/garden/assets/tiles/tile025.png",
    "/garden/assets/tiles/tile026.png",
    "/garden/assets/tiles/tile027.png",
    "/garden/assets/tiles/tile028.png",
    "/garden/assets/tiles/tile029.png",
    "/garden/assets/tiles/tile030.png",
    "/garden/assets/tiles/tile031.png",
    "/garden/assets/tiles/tile032.png",
    "/garden/assets/tiles/tile033.png",
    "/garden/assets/tiles/tile034.png",
    "/garden/assets/tiles/tile035.png",
    "/garden/assets/tiles/tile036.png",
    "/garden/assets/tiles/tile037.png",
    "/garden/assets/tiles/tile038.png",
    "/garden/assets/tiles/tile039.png",
    "/garden/assets/tiles/tile040.png",
    "/garden/assets/tiles/tile041.png",
    "/garden/assets/tiles/tile042.png",
    "/garden/assets/tiles/tile043.png",
    "/garden/assets/tiles/tile044.png",
    "/garden/assets/tiles/tile045.png",
    "/garden/assets/tiles/tile046.png",
    "/garden/assets/tiles/tile047.png",
    "/garden/assets/tiles/tile048.png",
    "/garden/assets/tiles/tile049.png",
    "/garden/assets/tiles/tile050.png",
    "/garden/assets/tiles/tile051.png",
    "/garden/assets/tiles/tile057.png",
    "/garden/assets/tiles/tile058.png",
    "/garden/assets/tiles/tile059.png",
    "/garden/assets/tiles/tile060.png",
    "/garden/assets/tiles/tile061.png",
    "/garden/assets/tiles/tile062.png",
    "/garden/assets/tiles/tile063.png",
    "/garden/assets/tiles/tile064.png",
    "/garden/assets/tiles/tile065.png",
    "/garden/assets/tiles/tile066.png",
    "/garden/assets/tiles/tile067.png",
    "/garden/assets/tiles/tile068.png",
    "/garden/assets/tiles/tile069.png",
    "/garden/assets/tiles/tile070.png",
    "/garden/assets/tiles/tile071.png",
    "/garden/assets/tiles/tile072.png",
    "/garden/assets/tiles/tile073.png",
    "/garden/assets/tiles/tile074.png",
    "/garden/assets/tiles/tile075.png",
    "/garden/assets/tiles/tile076.png",
    "/garden/assets/tiles/tile077.png",
    "/garden/assets/tiles/tile078.png",
    "/garden/assets/tiles/tile079.png",
    "/garden/assets/tiles/tile080.png",
    "/garden/assets/tiles/tile081.png",
    "/garden/assets/tiles/tile082.png",
    "/garden/assets/tiles/tile083.png",
    "/garden/assets/tiles/tile084.png",
    "/garden/assets/tiles/tile085.png",
    "/garden/assets/tiles/tile086.png",
    "/garden/assets/tiles/tile087.png",
    "/garden/assets/tiles/tile088.png",
    "/garden/assets/tiles/tile088-w1.png",
    "/garden/assets/tiles/tile088-bridge.png",
    "/garden/assets/tiles/tile089-bridge.png",
    "/garden/assets/tiles/tile089.png",
    "/garden/assets/tiles/tile090.png",
    "/garden/assets/tiles/tile091.png",
    "/garden/assets/tiles/tile092.png",
    "/garden/assets/tiles/tile093.png",
    "/garden/assets/tiles/tile094.png",
    "/garden/assets/tiles/tile095.png",
    "/garden/assets/tiles/tile096.png",
    "/garden/assets/tiles/tile097.png",
    "/garden/assets/tiles/tile098.png",
    "/garden/assets/tiles/tile099.png",
    "/garden/assets/tiles/tile100.png",
    "/garden/assets/tiles/tile101.png",
    "/garden/assets/tiles/tile102.png",
    "/garden/assets/tiles/tile104.png",
    "/garden/assets/tiles/tile104-lillypad.png",
    "/garden/assets/tiles/tile104-l-lillypad.png",
    "/garden/assets/tiles/tile104-orange.png",
    "/garden/assets/tiles/tile104-m-orange.png",
    "/garden/assets/tiles/tile104-grey.png",
    "/garden/assets/tiles/tile104-blue.png",
    "/garden/assets/tiles/tile112.png",
    "/garden/assets/tiles/tile113.png",
    "/garden/assets/tiles/tile114.png",
    "/garden/assets/tiles/tile115.png",
    "/garden/assets/tiles/tile116.png",
    "/garden/assets/tiles/tile117.png",
    "/garden/assets/tiles/tile118.png",
    "/garden/assets/tiles/tile120.png",
    "/garden/assets/tiles/tile122.png",
    "/garden/assets/tiles/tile123.png",
    "/garden/assets/tiles/tile124.png",
    "/garden/assets/tiles/tile126.png",
    "/garden/assets/tiles/tile127.png",
    "/garden/assets/tiles/tile128.png",
    "/garden/assets/tiles/tile129.png",
    "/garden/assets/tiles/tile129-w3.png",
    "/garden/assets/tiles/tile130.png",
    "/garden/assets/tiles/tile131.png",
    "/garden/assets/tiles/tile132.png",
    "/garden/assets/tiles/tile134.png",
    "/garden/assets/tiles/tile135.png",
    "/garden/assets/tiles/tile136.png",
    "/garden/assets/tiles/tile137.png",
    "/garden/assets/tiles/tile137-w2222.png",
    "/garden/assets/tiles/tile138.png",
    "/garden/assets/tiles/tile139.png",
    "/garden/assets/tiles/tile140.png",
    "/garden/assets/tiles/tile142.png",
    "/garden/assets/tiles/tile143.png",
    "/garden/assets/tiles/tile144.png",
    "/garden/assets/tiles/tile145.png",
    "/garden/assets/tiles/tile146.png",
    "/garden/assets/tiles/tile147.png",
    "/garden/assets/tiles/tile148.png",
    "/garden/assets/tiles/pink-flowers.png",
    "/garden/assets/tiles/solo-pink-flower.png",
    "/garden/assets/tiles/tulips.png",
    "/garden/assets/tiles/d-yellow.png",
    "/garden/assets/tiles/yellow.png",
    "/garden/assets/tiles/rose.png",
    "/garden/assets/tiles/sakura.png",
    "/garden/assets/tiles/d-violet.png",
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
  } else if (currentImage < 108) { //on met dans le span water
    divWater.appendChild(img);
  } else if (currentImage < 142) { //on met dans le span cliff
    divCliff.appendChild(img);
  }  
  else if (currentImage < 222) { //on met dans le span fleurs
    divFlowers.appendChild(img);
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
  //onn demande le nom du fichier
  let filename = prompt("Name of your creation :");
  filename = filename + ".png";
  downloadLink.download = filename;
  downloadLink.click();
  }, 1000);
}

function gitButton() {
  window.open("https://github.com/Claquettes/garden");
}

function exportButton(){ //we export the canvas as a json file
    let data = [];
    //for each tile, we get the image source and the position
    for (let i = 0; i < canvas.width; i += tileSize) {
      for (let j = 0; j < canvas.height; j += tileSize) {
        let imgData = ctx.getImageData(i, j, tileSize, tileSize);
        let dataURL = canvas.toDataURL();
        let src = dataURL;
        data.push({src, i, j});
      }
    }
    //we create a json file
    let json = JSON.stringify(data);
    let blob = new Blob([json], {type: "application/json"});
    let url  = URL.createObjectURL(blob);
    //we download the file
    let a = document.createElement('a');
    //on met le nom du fichier, en ajoutant l'heure et la date
    var filename = prompt("Name of your creation :");
    filename = filename + ".json";
  
    a.download    = filename;
    a.href        = url;
    a.textContent = "Download file";
    a.click();
}


//we import a json file in the "gardenInput" input
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  console.log('Selected file:', file);
  //when we select a file, we read it, and then we draw the images on the canvas
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = JSON.parse(event.target.result);
    data.forEach((tile) => {
      const image = new Image();
      image.src = tile.src;
      image.onload = () => {
        ctx.drawImage(image, tile.i*tileSize, tile.j*tileSize, tileSize*10, tileSize*10);
      };
    });
  };
  reader.readAsText(file);
});
    