let advertisement_Price = document.getElementById("ad-price");
let product_Price = document.getElementById("product-price");
let products_Number = document.getElementById("product-number");
let delivery_Price = document.getElementById("delivery-price");
let product_Profit_Persentage = document.getElementById(
  "product-profit-persentage"
);
let additional_Costs = document.getElementById("additional-costs");
let shipping_Price = document.getElementById("shipping-price");

let submit = document.getElementById("submit");
let results_Section = document.getElementById("results");

let total_Products_Spending = document.getElementById("total-product-spending");
let total_Shipping_Fees = document.getElementById("total-shipping-fees");
let total_Orders_Had_Been_Confirmed = document.getElementById(
  "total-orders-had-been-confirmed"
);
let total_Orders_Had_Been_Delivered = document.getElementById(
  "total-orders-had-been-delivered"
);

let total_Investment = document.getElementById("total-investment");
let total_Revenue = document.getElementById("total-revenue");
let one_product_cost = document.getElementById("one-product-cost");
let final_Product_Price = document.getElementById("final-product-price");
let total_Net_Profit = document.getElementById("total-net-profit");

let saveResultCont = document.getElementById("save-result_cont");
let saveResultInput = document.getElementById("save-result");

let arr = [
  advertisement_Price,
  product_Price,
  products_Number,
  delivery_Price,
  product_Profit_Persentage,
  additional_Costs,
  shipping_Price,
];
submit.onclick = () => {
  let isValid = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === "" || arr[i].value === "0") {
      isValid = false;
      break;
    }
  }

  if (saveResultCont.hidden) saveResultCont.hidden = false;

  if (isValid) {
    let peopleReached = (+advertisement_Price.value * 2000) / 50;
    let onePersonAdCost = +advertisement_Price.value / peopleReached;
    // let total_Sold_Products_Ammount =
    // +product_Profit_Persentage.value * +products_Number.value;

    let total_Products_Spending_Ammount =
      +product_Price.value * +products_Number.value;
    let total_Additional_Costs =
      +additional_Costs.value * +products_Number.value;
    let total_Shipping_Fees_Ammount =
      +products_Number.value * +shipping_Price.value;

    results_Section.hidden = false;

    total_Products_Spending.textContent = total_Products_Spending_Ammount;
    total_Orders_Had_Been_Confirmed.textContent = Math.floor(
      peopleReached / 10
    );
    total_Orders_Had_Been_Delivered.textContent = Math.floor(
      peopleReached / 12
    );
    total_Shipping_Fees.textContent = total_Shipping_Fees_Ammount.toFixed(2);

    let money_of_one_product_cost =
      +product_Price.value +
      Number(+delivery_Price.value / +products_Number.value);

    let the_Final_Price =
      +product_Price.value +
      Number(+product_Price.value * (+product_Profit_Persentage.value / 100)) +
      +shipping_Price.value +
      +additional_Costs.value +
      onePersonAdCost +
      Number(+delivery_Price.value / +products_Number.value);

    let total_Money_Invested =
      +advertisement_Price.value +
      total_Products_Spending_Ammount +
      +delivery_Price.value +
      total_Additional_Costs +
      total_Shipping_Fees_Ammount;

    let total_Money_Revenue = the_Final_Price * +products_Number.value;

    total_Investment.textContent = Math.ceil(total_Money_Invested);
    total_Revenue.textContent = Math.round(total_Money_Revenue);
    one_product_cost.textContent = money_of_one_product_cost.toFixed(1);
    final_Product_Price.textContent = Math.round(the_Final_Price);
    total_Net_Profit.textContent = Math.floor(
      total_Money_Revenue - total_Money_Invested
    );
  }
};

let sideBar = document.getElementById("side-bar");
let img = document.images[0];

let storedProducts = JSON.parse(localStorage.getItem("products"));
if (storedProducts) {
  for (let i = 0; i < storedProducts.length; i++) {
    let el = document.createElement("h3");
    el.classList = "product";
    el.innerHTML = storedProducts[i].prodName;
    sideBar.append(el);
  }
}

img.onclick = () => {
  sideBar.classList.toggle("active");
  let allProductsEl = [...document.getElementsByClassName("product")];
  console.log(allProductsEl);
  allProductsEl.forEach((el) => {
    el.onclick = () => {
      for (let i = 0; i < storedProducts.length; i++) {
        sideBar.classList.remove("active");
        const productData = storedProducts[i];
        if (productData.prodName == el.textContent) {
          let {
            adPrice,
            addiCosts,
            deliPrice,
            prodNumber,
            prodPrice,
            prodProfPers,
            shipPrice,
          } = productData;

          advertisement_Price.value = adPrice;
          product_Price.value = prodPrice;
          products_Number.value = prodNumber;
          delivery_Price.value = deliPrice;
          product_Profit_Persentage.value = prodProfPers;
          additional_Costs.value = addiCosts;
          shipping_Price.value = shipPrice;
          submit.click();
          saveResultCont.hidden = true;
        }
      }
    };
  });
};

saveResultInput.onkeydown = (e) => {
  if (e.key === "Enter") {
    let productsArr = JSON.parse(localStorage.getItem("products")) || [];
    let newProduct = {
      adPrice: advertisement_Price.value,
      prodPrice: product_Price.value,
      prodNumber: products_Number.value,
      deliPrice: delivery_Price.value,
      prodProfPers: product_Profit_Persentage.value,
      addiCosts: additional_Costs.value,
      shipPrice: shipping_Price.value,
    };
    let prodName = e.target.value;
    let prodData = {
      prodName,
      ...newProduct,
    };
    productsArr = [...productsArr, prodData];
    localStorage.setItem("products", JSON.stringify(productsArr));

    let newProductsArr = JSON.parse(localStorage.getItem("products"));
    console.log(sideBar.childNodes);
    for (let i = 0; i < newProductsArr.length; i++) {
      let el = document.createElement("h3");
      el.classList = "product";
      el.innerHTML = newProductsArr[i].prodName;
      sideBar.append(el);
    }
  }
};
