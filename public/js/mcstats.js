// This is an array of URLs to the GIFs that you want to display
let gifs = [
    "https://media.tenor.com/7jg0Rc46pfoAAAAC/a-mimir.gif",
    "https://media.tenor.com/W7oQekS6RS8AAAAd/choque-a-mimir-a-mimir.gif",
    "https://media.giphy.com/media/DxlzS6VnwbJm2S8h94/giphy.gif"
];

// This function will randomly select a GIF from the array and display it on the page
function showRandomGif() {
    let id = Math.floor(Math.random() * gifs.length);
    let randomGif = gifs[id];

    let img = document.createElement("img");
    img.src = randomGif;

    let gifContainer = document.getElementById("gif-container");
    gifContainer.innerHTML = "";

    gifContainer.appendChild(img);
}

showRandomGif();