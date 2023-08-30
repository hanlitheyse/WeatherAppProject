function createDate(date) {
  let month = date.toLocaleString("en-AU", { month: "short" });
  let time = date.toLocaleTimeString("en-AU", { timeStyle: "short" });
  let day = date.toLocaleString("en-AU", { day: "2-digit" });
  let wDay = date.toLocaleString("en-AU", { weekday: "short" });
  return `${wDay}, ${day} ${month},${time}`;
}

function postDate(date) {
  let liveDate = document.querySelector("#date");
  liveDate.innerHTML = createDate(new Date());
}

postDate();

let townFrm = document.querySelector("form");
console.log(townFrm);
townFrm.onsubmit = (event) => {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  postCity(city);
};

function postCity(city) {
  let liveCity = document.querySelector("#livecity");
  liveCity.innerHTML = city;
}

let cBtn = document.querySelector("#c");
let fBtn = document.querySelector("#f");

cBtn.onclick = () => {
  if (checkToggle(cBtn) == false) {
    cBtn.classList.add("selected");
    fBtn.classList.remove("selected");
    toggleTemp("c");
  }
};

fBtn.onclick = () => {
  if (checkToggle(fBtn) == false) {
    fBtn.classList.add("selected");
    cBtn.classList.remove("selected");
    toggleTemp("f");
  }
};
function checkToggle(btn) {
  return btn.classList.contains("selected") == true ? true : false;
}

function toggleTemp(unit) {
  let liveTemp = document.querySelector(".large-temp");
  switch (unit) {
    case "c":
      liveTemp.innerHTML = "29°C";
      break;
    case "f":
      liveTemp.innerHTML = "69°F";
      break;
  }
}
