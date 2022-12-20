//execute the function to get the data using ocr, when the user click on the sendReceipt button
function sendReceipt() {
    //get the image
    var img = document.getElementById("receipt");
    //get the image source
    var imgSrc = img.src;
    //get the data using ocr
    var data = ocr(imgSrc);
    //send the data to the server
    $.ajax({
        url: '/sendReceipt',
        type: 'POST',
        data: {data: data},
        success: function (data) {
            console.log(data);
        }
    });
}
//les sandwiches
let bigmac = 0;
let signature = 0;
let mcchicken = 0;
let deuxcentquatresvingt = 0;
let filetofish = 0;
let doublefiletofish = 0;
let cheeseburger = 0;
let cheeseburgerbacon = 0;
let doublecheeseburger = 0;
let doublecheeseburgerbacon = 0;
let triplecheeseburger = 0;
let triplecheeseburgerbacon = 0;
let mcnuggets = 0;
let mcfirstboeuf = 0;
let mcfirstpoulet = 0;
let mcfirstpoisson = 0;
let mcfirstveggie = 0;
let hamburger = 0;
let croquemcdo =0;
let mcfish=0;
let ptitranch = 0;
let ptitwrapboeuf = 0;
let mcmuffin = 0;
let mcmuffineggbacon = 0;
let cbo = 0;
let wrappouletbacon = 0;
let saisonnier = 0; 