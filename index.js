const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const submitForm = document.querySelector(".form");
const button = document.getElementById("button");
const loc = document.getElementById("robinson");
const otherLoc = document.getElementById("other-location");
const radioBtnOn = document.getElementById("fireON");
const radioBtnOff = document.getElementById("fireOFF");
const countField = document.getElementById("fire2");
const buttonHeart = document.getElementById("imgHeart");
const overflow = document.documentElement;
const heart = String.fromCharCode(10084);

function addHeart() {
  form1.value += heart;
}

function countHeart() {
  let countHeart = 0;
  let field = [...form1.value];
  for (let i = 0; i < field.length; i++) {
    if (field[i] === heart) {
      countHeart++;
    }
  }
  return countHeart;
}

buttonHeart.addEventListener("click", addHeart);
buttonHeart.addEventListener("click", countHeart);
buttonHeart.onclick = function () {
  if (buttonHeart.onclick || form1.value != 0) {
    form1.focus();
  }
};

function isCheckRadioBtn() {
  if (radioBtnOn.checked) {
    countField.style.display = "block";
    overflow.style.overflow = "visible";
    countField.focus();
  }
  if (radioBtnOff.checked) {
    countField.style.display = "none";
    overflow.style.overflow = "hidden";
    countField.value = 0;
  }
}

countField.addEventListener("keydown", function (event) {
  if (event.code == "Enter" || event.code == "NumpadEnter") {
    event.preventDefault();
    handleClick();
  }
});

radioBtnOn.addEventListener("click", isCheckRadioBtn);
radioBtnOff.addEventListener("click", isCheckRadioBtn);

const countWord = function(str = form1.value) {
 const place = function() {
    let sumLoc = 0;
    if (loc.checked) {
      sumLoc = 5;
    } else if (otherLoc.checked) {
      sumLoc = 0;
    }
    return sumLoc;
  }

  let countCoastWordWithoutPirotecnics = (
    item = arr.length - countHeart(),
    count = countField.value
  ) => {
    let result = 0;
    let countHeartNumbers = countHeart();

  

    if (item > 0 && !str.includes(heart) && loc.checked) {
      result =
        Math.ceil(
          (item * 15 + countHeartNumbers * 25 - 30) / 2 + 30 + count * 7
        ) + (place());
    }
    if (item > 0 && !str.includes(heart) && otherLoc.checked) {
      result =
        Math.ceil(
          (item * 15 + countHeartNumbers * 25 - 30) / 2 + 30 + count * 7
        ) + (place());
    }
    if (item > 0 && str.includes(heart)) {
      result =
        Math.ceil(
          (item * 15 + countHeartNumbers * 25 - 30) / 2 + 30 + count * 7
        ) + (place());
    }
    if (!item && str.includes(heart)) {
      result =
        Math.ceil((countHeartNumbers * 25 - 30) / 2 + 30 + count * 7) + (place());
    }
    if (!form1.focus()) {
      form1.blur();
    }
    return result < 50 ? 50 : result;
  };

  let countCoastWordWithPirotecnics = (
    item = arr.length - countHeart(),
    count = countField.value
  ) => {
    let result = 0;
    let countHeartNumbers = countHeart();
    if (item > 0) {
      result =
        Math.ceil(
          (item * 15 + countHeartNumbers * 25 - 30) / 2 +
            30 +
            count * 7 +
            (item + countHeart()) * 7
        ) + place();
    }
    if (!item && str.includes(heart)) {
      result =
        Math.ceil(
          (countHeartNumbers * 25 - 30) / 2 + 30 + count * 7 + countHeart() * 7
        ) + place();
    }
    
    return result < 50 ? 50 : result;
  };

  let arr = str.toLowerCase().split("").filter(element => element !== " ");
  console.log(arr)

  return `?????????????? ---- ${arr}
???????????? ??????????????, ????. ---- ${arr.length}
 -???????????????????? ????????,????. ---- ${arr.length - countHeart()}
 -???????????????????? ????????????, ???? ---- ${countHeart()}
??????.????????????????, ????. ---- ${countField.value > 0 ? countField.value : 0}
????????????????, ????. ---- ${place()}

?????????????????? ?????? ???????????????????????????????? ??????????????, ??.??.  ---- ${countCoastWordWithoutPirotecnics()} 
?????????????????? ?? ?????????????????????????????? ????????????????, ??.??. ---- ${countCoastWordWithPirotecnics()}`;
}

const handleClick = () => {
  if (form1.value) {
    form2.value = countWord();
  } else {
    form2.placeholder = "?????????????? ??????????";
  }
};

form1.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    handleClick();
    button.style.backgroundColor = "#be81f0";
    setTimeout(function () {
      button.style.backgroundColor = "#f4f5f6";
    }, 100);
  }
});
button.addEventListener("click", handleClick);

if (window.screen.width < 500) {
  form1.oninput = () => {
    form2.value = countWord();
    form1.focus();
  };
  countField.oninput = () => {
    form2.value = countWord();
    countField.focus();
  };
} else if (window.screen.width > 500) {
  form1.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      handleClick();
      button.style.backgroundColor = "#be81f0";
      setTimeout(function () {
        button.style.backgroundColor = "#f4f5f6";
      }, 100);
    }
  });
  button.addEventListener("click", handleClick);
}

const renderContent = (res) => {
  let { Date } = res;
  let currentDate = String(Date)
    .split("T")
    .slice(0, 1)
    .map((item) => item.split("-").reverse().join("."));
  let content = document.getElementById("data").innerHTML;
  Object.keys(res).map((el) => {
    if (el.includes("Cur_OfficialRate")) {
    content += `<td>
    <tr>???????? USD ???? ????????  - ${res.Cur_OfficialRate} BYN</tr>
    <tr>???? ???????? ${currentDate}</tr>
    </td>`;
    }
  });
  document.getElementById("data").innerHTML = content;
};

async function getCurrency() {
  let promCurrency = await fetch("https://www.nbrb.by/api/exrates/rates/431");
  let data = await promCurrency.json();
  return data;
}

getCurrency().then(renderContent);

const usd = document.getElementById("data");

