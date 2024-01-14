function setupDOMEvents() {
  const introText = document.querySelector(".intro-text");
  if (introText) {
    introText.addEventListener("mouseover", function () {
      this.classList.add("intro-text-mouse-over");
    });

    introText.addEventListener("mouseout", function () {
      this.classList.remove("intro-text-mouse-over");
    });
  }

  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      console.log("Log in button clicked");
    });
  }

  const firstInput = document.querySelector("input");
  if (firstInput) {
    firstInput.addEventListener("focus", function () {
      this.style.outline = "2px solid blue";
    });

    firstInput.addEventListener("blur", function () {
      this.style.outline = "";
    });
  }

  window.addEventListener("scroll", function () {
    console.log("Scrolling...");
  });

  window.addEventListener("resize", function () {
    console.log(
      "Window resized to:",
      window.innerWidth,
      "x",
      window.innerHeight
    );
  });

  window.addEventListener("load", function () {
    console.log("Page fully loaded");
  });

  const imageElement = document.querySelector("img");
  imageElement.addEventListener("error", function () {
    console.log("Image failed to load:", this.src);
  });

  document.addEventListener("mousemove", function (event) {
    console.log("Mouse position:", event.clientX, event.clientY);
  });
}

document.addEventListener("DOMContentLoaded", setupDOMEvents);

document.addEventListener("DOMContentLoaded", (event) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible-content");
        }
      });
    },
    { threshold: 0.5 }
  );

  const hiddenSections = document.querySelectorAll(".hidden-content");
  hiddenSections.forEach((section) => observer.observe(section));
});
