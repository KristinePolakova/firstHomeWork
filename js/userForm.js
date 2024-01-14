const registrationForm = document.getElementById("registrationForm");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const containerDiv = document.getElementById("containerDiv");

let isRegistrationFormOpen = false;
let generatedDiv = null;

registerBtn.addEventListener("click", () => {
  isRegistrationFormOpen = !isRegistrationFormOpen;
  registrationForm.classList.toggle("hiddenAll");
  setTimeout(() => {
    registrationForm.classList.toggle("hidden");
  }, 20);
});

loginBtn.addEventListener("click", () => {
  if (!generatedDiv) {
    generatedDiv = generatedOverlayDiv();
    containerDiv.appendChild(generatedDiv);
  }
  generatedDiv.classList.toggle("hiddenAll");
  setTimeout(() => {
    generatedDiv.classList.toggle("block");
  }, 20);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && generatedDiv) {
    generatedDiv.classList.remove("block");
    generatedDiv.classList.add("hiddenAll");
  }
});

function generatedOverlayDiv() {
  let overlayDiv = document.createElement("div");
  overlayDiv.classList.add("overlay", "hiddenAll");

  let loginInput = document.createElement("input");
  loginInput.type = "text";
  loginInput.placeholder = "Login";
  loginInput.classList.add("form-control");

  let passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.classList.add("form-control");

  overlayDiv.appendChild(loginInput);
  overlayDiv.appendChild(passwordInput);

  overlayDiv.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (event.target === overlayDiv) {
      overlayDiv.classList.add("hiddenAll");
      setTimeout(() => {
        overlayDiv.classList.remove("block");
      }, 20);
    }
  });

  return overlayDiv;
}

document.addEventListener("click", (event) => {
  if (
    generatedDiv &&
    !containerDiv.contains(event.target) &&
    !loginBtn.contains(event.target)
  ) {
    closeOverlay();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeOverlay();
  }
});

function closeOverlay() {
  if (generatedDiv) {
    generatedDiv.classList.add("hiddenAll");
    setTimeout(() => {
      generatedDiv.classList.remove("block");
    }, 20);
  }
}
