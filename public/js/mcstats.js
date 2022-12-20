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
const ctx = document.getElementById('myChart');
  
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});