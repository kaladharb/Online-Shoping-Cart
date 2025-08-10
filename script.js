//elemts refersnce
const productelement = document.getElementById("product-container");
const cartcont = document.getElementById("cartcontainer");
const feedback = document.getElementById("feed");
const totalprice = document.getElementById("totalprice");
const clrbtn = document.getElementById("clr-btn");
const sortbtn = document.getElementById("sort");
//default products
const productsavailabel = [
  {
    id: 1,
    name: "laptop",
    price: 65000,
    image: "images/laptop.jpg",
  },
  {
    id: 2,
    name: "mobile",
    price: 25000,
    image: "images/mobile.jpg",
  },
  {
    id: 3,
    name: "watch",
    price: 5000,
    image: "images/watch.jpg",
  },
  {
    id: 4,
    name: "powerbank",
    price: 1800,
    image: "images/powerbank.jpg",
  },
  {
    id: 5,
    name: "ipad",
    price: 150000,
    image: "images/ipad.jpg",
  },
];

//empty cart
const cart = [];

function renderproductdetails() {
  productelement.innerHTML = ""; // clear before rendering
  productsavailabel.forEach(function (product) {
    const { id, name, price, image } = product;

    const divElement = document.createElement("div");
    divElement.className = "product-row";

    divElement.innerHTML = `
      <img src="${image}" alt="${name}" class="product-img">
      <p>${name} - RS ${price}</p>
      <button onclick="adcart(${id})">Add to cart</button>
    `;

    productelement.appendChild(divElement); // append to container
  });
}

function rendercart() {
  cartcontainer.innerHTML = "";
  cart.forEach(function (product) {
    const { id, name, price, image } = product;
    const itemcart = `
      <div class="product-row">
        <img src="${image}" alt="${name}" class="product-img">
        <p>${name} - RS ${price}</p>
        <button onclick="removecart(${id})">Remove</button>
      </div>
    `;

    cartcontainer.insertAdjacentHTML("beforeend", itemcart);
  });
  let totalprices = 0;
  for (let i = 0; i < cart.length; i++) {
    totalprices += cart[i].price;
  }
  totalprice.textContent = `Rs. ${totalprices}`;
}

function adcart(id) {
  const productadd = productsavailabel.find(function (values) {
    return values.id === id;
  });

  const isprodavailable = cart.some((product) => product.id === id);
  if (isprodavailable) {
    // feedback.textContent = "Item is already added to cart";
    updatefeed("Item is already added to cart", "error");
    return;
  }

  cart.push(productadd);
  console.log(cart);
  rendercart();

  updatefeed("Item added to cart successfuly", "sucess");
}

function removecart(id) {
  // console.log(id);
  const product = cart.find((product) => product.id === id);
  // const updatedcart = cart.filter(function (item) {
  //   return item.id !== id;
  // });
  const productindex = cart.findIndex((product) => product.id === id);
  cart.splice(productindex, 1);
  updatefeed(`${product.name} is removed from cart`, "remove");

  rendercart();
  // console.log(updatedcart);
}
let timerid;
function updatefeed(msg, type) {
  feedback.style.display = "block";
  clearTimeout(timerid);

  if (type === "sucess") {
    feedback.style.backgroundColor = "green";
  }
  if (type === "error") {
    feedback.style.backgroundColor = "red";
  }
  if (type === "remove") {
    feedback.style.backgroundColor = "#6495ED";
  }
  feedback.textContent = msg;

  timerid = setTimeout(function () {
    feedback.style.display = "none";
  }, 3000);
}

clrbtn.addEventListener("click", () => {
  cart.length = 0;
  updatefeed("cart is cleared now!!", "sucess");
  rendercart();
});

sortbtn.addEventListener("click", () => {
  cart.sort((item1, item2) => item1.price - item2.price);
  rendercart();
});
//rendering product details
renderproductdetails();
