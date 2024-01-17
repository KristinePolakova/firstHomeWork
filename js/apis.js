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
    let statusCodes = [
      100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
      301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406,
      407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423,
      424, 425, 426, 428, 429, 431, 444, 450, 451, 497, 498, 499, 500, 501, 502,
      503, 504, 505, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599,
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
    card.querySelector(".card-title").innerText = statusCodeInfo.code;
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
