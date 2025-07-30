const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const FINALamount = document.querySelector(".finalamount");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let enteramount = document.querySelector(".enteramount input");
  let amtVal = enteramount.value;
  if (amtVal === "" || amtVal < 0) {
    amtVal = 1;
    enteramount.value = "1";
  }
  const URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;  
  let response = await fetch(URL);
  let data = await response.json();
  let rates = data[fromCurr.value.toLowerCase()]
  let rate = rates[toCurr.value.toLowerCase()]

  let finalAmount = amtVal * rate;
  msg.innerText = `1 ${fromCurr.value} = ${rate} ${toCurr.value}`;
  FINALamount.innerText = finalAmount; 
};


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});