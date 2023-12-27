const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

btnClose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadDress);

function loadDress() {
  loadContent();
}
function loadContent() {
  //Remove  Dress items from Cart
  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });
  //product item change event
  let qtyElements = document.querySelectorAll(".card-quantity");
  qtyElements.forEach((input) => {
    input.addEventListener("change", changeQty);
  });
  //product Cart
  let cartBtns = document.querySelectorAll(".add-cart");
  cartBtns.forEach((input) => {
    input.addEventListener("click", addCart);
  });
  //Update Total
  updateTotal();
}
//Remove item
function removeItem() {
  if (confirm("Are Your Sure to Remove")) {
    let title = this.parentElement.querySelector(".cart-dress-title").innerHTML;
    itemList = itemList.filter((el) => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}
let itemList = [];

//AddCart
function addCart() {
  let Dress = this.parentElement;
  let title = Dress.querySelector(".dress-title").innerHTML;
  let price = Dress.querySelector(".dress-price").innerHTML;
  let imgSrc = Dress.querySelector(".dress-img").src;
  //console.log(title,price,imgSrc);

  let newProduct = {
    title,
    price,
    imgSrc,
  };

  //Check product already Exist in Cart

  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product Already added in Cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement("div");
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  loadContent();
}

function createCartProduct(title, price, imgSrc) {
  return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
      <div class="cart-dress-title">${title}</div>
      <div class="price-box">
      <div class="cart-price">${price}</div>
      <div class="cart-amt">${price}</div>
  </div>
    <div class="Qty">
    <h5>QTY</h5>
    <input type="number" value="1" class="card-quantity">
    </div>
  </div>
      <ion-icon name="trash" class="cart-remove"></ion-icon>
  </div>
  `;
}
function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-box");
  const totalValue = document.querySelector(".total-price");

  let total = 0;

  cartItems.forEach((product) => {
    let priceElement = product.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
    let qty = product.querySelector(".card-quantity").value;
    total += price * qty;
    product.querySelector(".cart-amt").innerText = "Rs." + price * qty;
  });

  totalValue.innerHTML = "Rs." + total;

  // Add Product Count in Cart Icon
  const cartCount = document.querySelector(".cart-count");
  let count = itemList.length;
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}
