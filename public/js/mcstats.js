
let data = JSON.parse(document.currentScript.getAttribute("data"));

let bestOf = 0; 
let maxiBestOf = 0;
let menuMcFirst = 0;
let maxiMcFirst = 0;
let happymeal = 0;
let nuggets = 0;
let bigmac = 0;
let le280 = 0;


foreach(data, (order) => {
  let orderData = JSON.parse(order.order_json);

  foreach(orderData.menus, (menu) => {    // foreach menu in order
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
      foreach(orderData.products, (product) => { // foreach product PRODUCTS array
          switch(product.product_id){
              case 13:
                  nuggets++;
                  break;
              case 140:
                  bigmac++;
                  break;
              case 34:
                  le280++;
                  break;
          }
      });
  });
});

const chartData = {       //data and charts for the type of menu
  menu_id: 1,
  products: [
    { name: "BestOf", value: bestOf},
    { name: "maxiBestOf", value: maxiBestOf },
    { name: "McFirst", value: menuMcFirst },
    { name: "Maxi McFirst", value: maxiMcFirst },
    { name: "Happymeal", value: happymeal },
  ]
};
const burgerData = {       //data and charts for the type of sandwich
    menu_id: 1,
    products: [
        { name: "BigMac", value: bigmac},
        { name: "280", value: le280},
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
    labels: burgerData.products.map(product => product.name),
    datasets: [
      {
        label: `burgers`,
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        display: true,
        data: burgerData.products.map(product => product.value),
      },
    ],
  },
});

const c = document.getElementById("boissonChart").getContext("2d");
const boisson = new Chart(c, {
    type: "pie",
    data: {
        labels: chartData.products.map(product => product.name),
        datasets: [
            {
                label: `boisson`,
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                display: true,
                data: chartData.products.map(product => product.value),
                //on rajoute une légende "boisson" pour ce graphique
              options: {
                legend: {
                    display: true,
                    text: 'Boisson'
                }
              }

            }
        ]
    }
});


// defining foreach function, needed because of JSON.parse crappy design which converts Arrays into objects with indexes as keys
function foreach(object, cb){
  for (let key in object){
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      cb(object[key]);
    }
  }
}