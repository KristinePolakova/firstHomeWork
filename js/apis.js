async function getAllCharacters() {
  try {
    const response = await fetch(
      "https://www.anapioficeandfire.com/api/characters"
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function getCatStatus() {
  try {
    const statusCodes = [
      100, 101, 102, 200, 201, 202, 400, 401, 402, 403, 404, 405, 406,
    ];
    const catData = statusCodes.map((code) => {
      return {
        code: code,
        imageUrl: `https://http.cat/${code}`,
      };
    });
    return catData;
  } catch (e) {
    console.error(e);
  }
}

function fillCardData(card, statusCodeInfo, character) {
  if (character && statusCodeInfo) {
    card.querySelector(".card-title").innerText =
      character.name || statusCodeInfo.code;
    card.querySelector(".card-text").innerText =
      "Aliases: " +
      (character.aliases && character.aliases.length > 0
        ? character.aliases.join(", ")
        : "None");
    let img = card.querySelector(".card-img");
    if (img) {
      img.src = statusCodeInfo.imageUrl;
      img.alt = "HTTP status code " + statusCodeInfo.code;
    }
  } else {
    console.error("Missing data for card", { statusCodeInfo, character });
  }
}

async function generateContent(div) {
  let cloned;
  let clonedCard;
  let card;
  let catData = await getCatStatus();
  let characters = await getAllCharacters();

  catData.forEach(function (statusCodeInfo, i) {
    let character = characters[i % characters.length];

    if (i % 3 === 0) {
      cloned = div.cloneNode(true);
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, statusCodeInfo, character);
      cloned.appendChild(clonedCard);
    } else if (i % 3 === 1) {
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, statusCodeInfo, character);
      cloned.appendChild(clonedCard);
    } else {
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, statusCodeInfo, character);
      cloned.appendChild(clonedCard);
      cloned.removeChild(cloned.querySelector(".col"));
      div.parentElement.appendChild(cloned);
    }
  });

  div.parentElement.removeChild(div);
}

const originalDiv = document.querySelector("#templateDiv");
generateContent(originalDiv);
