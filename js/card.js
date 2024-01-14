const productInfo = {
  "Mobile Sauna": {
    price: 100,
    description: "Portable sauna for your relaxation needs.",
    longDescription:
      "Our finely crafted saunas are not just a means to unwind, but a transportable luxury experience that we bring right to your preferred location. Whether it's the tranquility of your garden, afestive gathering, or an adventurous outdoor spot, our mobile saunas are designed to suit any environment.",
  },
  "Mobile Hot Tub": {
    price: 150,
    description: "Enjoy a hot tub experience anywhere you like.",
    longDescription:
      "Perfect for romantic evenings, social gatherings, or a solitary soak under the stars, our hot tubs are the epitome of indulgence. We deliver the hot tub to your location, handling all the setup details so you can simply step in and let the warm waters melt your cares away.",
  },
  "Canoe Boats": {
    price: 75,
    description: "Rent a canoe for a peaceful day on the water.",
    longDescription:
      "Our canoes are the perfect vessels for adventurers and peace-seekers alike. Glide over glassy lakes, navigate gentle rivers, or explore hidden streams. Our fleet is diverse, featuring canoes that range from sturdy, family-friendly models to sleek, lightweight designs for the more experienced paddler.",
  },
};

console.log(productInfo["Mobile Sauna"].description);

function updateCardInformation() {
  document.querySelectorAll(".card").forEach(function (card) {
    const cardTitle = card.querySelector(".card-title").textContent;
    if (productInfo[cardTitle]) {
      const cardText = card.querySelector(".card-text");
      cardText.textContent = productInfo[cardTitle].description;
      const priceElement = document.createElement("p");
      priceElement.textContent = `Price: $${productInfo[cardTitle].price}`;
      priceElement.classList.add("p-2");
      card.appendChild(priceElement);
    }
  });
}

updateCardInformation();

document.querySelectorAll(".card").forEach(function (card) {
  card.addEventListener("click", function () {
    const cardTitle = card.querySelector(".card-title").textContent;

    const overlay = document.createElement("div");
    overlay.classList.add("card-overlay");

    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");
    if (productInfo[cardTitle]) {
      overlayContent.textContent = productInfo[cardTitle].longDescription;
    } else {
      overlayContent.textContent = "Information not available";
    }
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function () {
      document.body.removeChild(overlay);
    });
  });
});
