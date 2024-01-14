document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("form");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document
      .querySelector('input[placeholder="First name"]')
      .value.trim();
    const lastName = document
      .querySelector('input[placeholder="Last name"]')
      .value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const message = document.querySelector("textarea").value.trim();

    if (!firstName || !lastName || !email || !message) {
      alert("Please fill in all the fields properly.");
    } else {
      alert("Submission was successful.");
      contactForm.reset();
    }
  });
});
