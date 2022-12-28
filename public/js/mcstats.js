
let data = document.currentScript.getAttribute("data");
let bestOf = 0; 
let maxiBestOf = 0;
let menuMcFirst = 0;
let maxiMcFirst = 0;
let happymeal = 0;
console.log(data);
for (let order in data){
  console.log(order);
  let orderdata = JSON.parse(order.order_json);
  for(let menu in orderdata.menus){
    switch(menu.menu_id){
      case 1: 
        bestOf++;
        break;
      case 2:
        maxiBestOf++;
        break;
      case 3:
        menuMcFirst++;
        break;
      case 4:
        maxiMcFirst++;
        break;
      case 5:
        happymeal++;
        break;
  }
}}


const chartData = {
  menu_id: 1,
  products: [
    { name: "BestOf", value: bestOf},
    { name: "maxiBestOf", value: maxiBestOf },
    { name: "McFirst", value: menuMcFirst },
    { name: "Maxi McFirst", value: maxiMcFirst },
    { name: "Happymeal", value: happymeal },
  ]
};
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: chartData.products.map(product => product.name),
    datasets: [
      {
        label: `Menu ${chartData.menu_id}`,
        data: chartData.products.map(product => product.value),
      },
    ],
  },
});
console.log(document.currentScript.getAttribute("data"));

