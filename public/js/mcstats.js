
let data = JSON.parse(document.currentScript.getAttribute("data"));

let bestOf = 0; 
let maxiBestOf = 0;
let menuMcFirst = 0;
let maxiMcFirst = 0;
let happymeal = 0;

foreach(data, (order) => {
  let orderData = JSON.parse(order.order_json);

  foreach(orderData.menus, (menu) => {
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
  });
});

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
const ctx = document.getElementById("accompagnementChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: chartData.products.map(product => product.name),
    datasets: [
      {
        label: `Side-Meal`,
        data: chartData.products.map(product => product.value),
      },
    ],
  },
});
const ct = document.getElementById("burgerChart").getContext("2d");
const burg = new Chart(ct, {
  type: "pie",
  data: {
    labels: chartData.products.map(product => product.name),
    datasets: [
      {
        label: `burgers`,
        data: chartData.products.map(product => product.value),
      },
    ],
  },
});


// defining foreach function, needed because of JSON.parse crappy design which converts Arrays into objects with indexes as keys
function foreach(object, cb){
  for (let key in object){
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      cb(object[key]);
    }
  }
}