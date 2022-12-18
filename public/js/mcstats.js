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
