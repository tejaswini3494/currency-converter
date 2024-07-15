const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

// console.log(countryList);
// console.log(dropdowns);

dropdowns.forEach((select) => {
  //   console.log(select);

  for (const code in countryList) {
    // console.log(code);

    const newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;

    if (select.name == "from" && code == "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && code == "INR") {
      newOption.selected = "selected";
    }
    //  console.log(newOption);
    select.append(newOption);

    //  console.log(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
    // console.log(e.target.value);
  });
});

const updateFlag = (element) => {
  // console.log(element);
  currCode = element.value;

  let countryCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");

  img.src = newSrc;
  //   console.log(img);
};

const btn = document.querySelector("button");

// console.log(btn);
btn.addEventListener("click", async (e) => {
  e.preventDefault();

  // console.log(e.target.innerText);

  let amount = document.querySelector("input");
  // console.log(amount);

  amtVal = amount.value;
  //   console.log(amtVal);

  if (amtVal == " " || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  console.log(fromCurr.value, toCurr.value);

  const URL = `https://v6.exchangerate-api.com/v6/3581494275b1801acb3a4397/latest/${fromCurr.value}`;

  const response = await fetch(URL);
  const data = await response.json();

  // console.log(data);

  const exchangerate = data.conversion_rates[toCurr.value];
  console.log(exchangerate);

  let finalAmt = exchangerate * amtVal;

  console.log(finalAmt);

  let msg = document.querySelector(".msg");

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
});
