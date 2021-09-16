var tip_percentage = "5";
var bill = 0;
var people = 1;
var total = 0;
var total_tip = 0;
var total_pp = 0;
var total_tip_pp = 0;
var searchTimeout;

document.querySelector(".d-grid__item--custom").onkeydown = function () {
  if (searchTimeout != undefined) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(checkPercentage, 250);
};

document.querySelector("#bill").onkeydown = function () {
  if (searchTimeout != undefined) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(calculatePercentage, 250);
};

document.querySelector("#people").onkeydown = function () {
  if (searchTimeout != undefined) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(calculatePercentage, 250);
};

function activeButton(element) {
  var myPercentages = document.querySelectorAll(".d-grid__item");
  myPercentages.forEach((item, i) => {
    myPercentages[i].classList.remove("d-grid__item--active");
  });

  if (element.type == "button") {
    element.classList.add("d-grid__item--active");
    document.querySelector(".d-grid__item--custom").value = "";
    tip_percentage = element.value.replace("%", "");
  }

  calculatePercentage();
}

function checkPercentage() {
  var customPercentage = document
    .querySelector(".d-grid__item--custom")
    .value.toString();
  tip_percentage = customPercentage.replace("%", "");

  calculatePercentage();
}

function calculatePercentage() {
  document.querySelector("#people").classList.remove("people--wrong");
  document.querySelector(".warning").classList.remove("warning--active");
  bill = parseFloat(document.querySelector("#bill").value);
  people = parseFloat(document.querySelector("#people").value);
  tip_percentage = parseFloat(tip_percentage);

  if (Number.isNaN(bill) == true) {
    bill = 0;
  }

  if (Number.isNaN(people) == true || people <= 0) {
    if (people <= 0) {
      console.log("dentro");
      document.querySelector("#people").classList.add("people--wrong");
      document.querySelector(".warning").classList.add("warning--active");
    }
    people = 1;
  }

  total_tip = (bill / 100) * tip_percentage;
  total = bill + total_tip;

  total_tip_pp = total_tip / people;
  total_pp = total / people;

  writeTotal(total_pp, total_tip_pp);
}

function writeTotal(myTotal, myTotalTip) {
  var myTotalText = document.querySelector("#final-total");
  var myTotalTipText = document.querySelector("#final-tip");

  myTotalText.textContent = "";
  myTotalText.appendChild(document.createTextNode("$" + myTotal.toFixed(2)));
  myTotalTipText.textContent = "";
  myTotalTipText.appendChild(
    document.createTextNode("$" + myTotalTip.toFixed(2))
  );

  console.log(myTotalText);
}

function resetTotal() {
  var myTotalText = document.querySelector("#final-total");
  var myTotalTipText = document.querySelector("#final-tip");

  myTotalText.textContent = "$0.00";
  myTotalTipText.textContent = "$0.00";
}
