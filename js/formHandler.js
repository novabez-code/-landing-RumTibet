import emailjs from "./email.min.js";

emailjs.init("_OxflTW4NjZYfvCgK");

const SERVER_ID = "service_8mwjkz7";
const TEMPLATE_ID = "template_yuysfce";

const form = document.querySelector("#newsletter-form");
const submitBtn = document.querySelector("#submit_btn");
const messageBlock = document.querySelector("#form__message");
const honeypotInput = document.getElementById("form_honeypot");

function toggleLoading(isLoading) {
  if (isLoading) {
    submitBtn.textContent = "Подписка...";
    submitBtn.disabled = true;
    messageBlock.classList.remove("active");
  } else {
    submitBtn.textContent = "Подписаться на новости";
    submitBtn.disabled = false;
  }
}

function showMessage(text, isSuccess) {
  messageBlock.classList.add("active");
  messageBlock.textContent = text;
  messageBlock.style.color = isSuccess ? "#f2be22" : "#e74c3c";

  setTimeout(() => {
    messageBlock.classList.remove("active");
  }, 5000);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (honeypotInput.value === "") {
    toggleLoading(true);
    const email = e.target.elements["form_email"].value;

    try {
      await emailjs.sendForm(SERVER_ID, TEMPLATE_ID, this);

      showMessage(`Писмо отправленно на ${email}`, true);
      form.reset();
    } catch (err) {
      console.error("Ошибка EmailJS:", err);
      showMessage(`Произошла ошибка при отправке. Попробуйте позже.`, false);
    } finally {
      toggleLoading(false);
    }
  }
});
