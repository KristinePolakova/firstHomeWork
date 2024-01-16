const originalDiv = document.querySelector("#templateDiv");

async function getCatStatus() {
  try {
    const statusCodes = [
      100, 101, 102, 200, 201, 202, 400, 401, 402, 403, 404, 405, 406,
    ];
    const data = statusCodes.map((code) => {
      return {
        code: code,
        imageUrl: `https://http.cat/${code}`,
      };
    });
    return data;
  } catch (e) {
    console.error(e);
  }
}

function fillCardData(card, statusCodeInfo) {
  card.querySelector(".card-title").innerText = statusCodeInfo.code;
  card.querySelector(".card-text").innerText = "";
  let img = card.querySelector(".card-img");
  img.src = statusCodeInfo.imageUrl;
  img.alt = "HTTP status code " + statusCodeInfo.code;
}

// function fillCardData(card, statusCodeInfo) {
//   card.querySelector(".card-title").innerText = statusCodeInfo.code;
//   card.querySelector(".card-text").innerText = "";
//   let img = card.querySelector("img");
//   if (!img) {
//     img = document.createElement("img");
//     card.appendChild(img);
//   }
//   img.src = statusCodeInfo.imageUrl;
// }

async function generateContent(div) {
  let cloned;
  let clonedCard;
  let card;
  let data = await getCatStatus();

  data.forEach(function (value, i) {
    if (i % 3 === 0) {
      //I begin new div with first card
      cloned = originalDiv.cloneNode(true);
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
    } else if (i % 3 === 1) {
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
    } else {
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
      cloned.removeChild(cloned.querySelector(".col"));
      document.querySelector("#api-container").appendChild(cloned);
    }
  });
  document.querySelector("#api-container").removeChild(originalDiv);
}

generateContent(originalDiv);

//If you do not wish to have a function as getElixirs(), here is a function to just get all records from the database

async function getAllObjects() {
  try {
    const response = await fetch(
      "https://wizard-world-api.herokuapp.com/Elixirs"
    );

    const data = await response.json(); //Still a promise
    return data;
  } catch (e) {
    console.error(e);
  }
}

//Get specific wizard object

async function getSpecificObject(parameter) {
  try {
    let fullWizardInfo = await fetch(
      `https://wizard-world-api.herokuapp.com/Wizards/${parameter}`
      //"https://wizard-world-api.herokuapp.com/Wizards/" + inventor.id
    );
    let singleObj = await fullWizardInfo.json();
    return singleObj;
  } catch (e) {
    console.error(e);
  }
}

//A more generic function
async function getListOfObjectsApi(url) {
  try {
    return (await fetch(url)).json();
  } catch (e) {
    console.error(e);
  }
}

//A more generic function with param
async function getListOfObjectsApi(url, param) {
  try {
    return (await fetch(url)).json();
  } catch (e) {
    console.error(e);
  }
}
