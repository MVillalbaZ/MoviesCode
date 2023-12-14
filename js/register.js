const users = JSON.parse(localStorage.getItem("users")) || [];
import { userAdmin } from "./data.js";
import { User } from "./class.js";

let emailReg = document.querySelector("#emailReg");
let usernameReg = document.querySelector("#userReg");
let passwordReg = document.querySelector("#passwordReg");
let profileReg = document.querySelector("#profileReg");
let passConfirm1 = document.querySelector("#passwordReg");
let passConfirm2 = document.querySelector("#passwordConfirm");
let messageConfirm2 = document.querySelector("#message");

window.registerUser = (event) => {
  event.preventDefault();
  if (
    passConfirm1.value == passConfirm2.value &&
    emailReg.value != "" &&
    usernameReg.value != "" &&
    passwordReg.value != "" &&
    profileReg.value != ""
  ) {
    const user = new User(
      emailReg.value,
      usernameReg.value,
      passwordReg.value,
      profileReg.value
    );
    localStorage.removeItem("auth");
    localStorage.setItem("users", JSON.stringify(user));
    location.assign("/");
    sendMail();
  }
};

window.check = () => {
  if (passConfirm1.value == passConfirm2.value) {
    messageConfirm2.style.color = "green";
    messageConfirm2.innerHTML = "La contraseña coincide";
  } else {
    messageConfirm2.style.color = "red";
    messageConfirm2.innerHTML = "La contraseña no coincide";
  }
};

window.logIn = (event) => {
  event.preventDefault();

  let emailLog = document.querySelector("#emailLog").value;
  let passwordLog = document.querySelector("#passwordLog").value;

  if (
    emailLog == userAdmin.emailAdmin &&
    passwordLog == userAdmin.passwordAdmin
  ) {
    localStorage.removeItem("users");
    localStorage.setItem(
      "auth",
      JSON.stringify({
        user: userAdmin.usernameAdmin,
        email: userAdmin.emailAdmin,
        avatar: userAdmin.avatarAdmin,
      })
    );

    location.replace("/pages/admin.html");
  } else if (emailLog == users.emailReg && passwordLog == users.passwordReg) {
    localStorage.removeItem("auth");
    location.replace("/pages/user.html");
  } else {
    alert("El correo o la contraseña no son correctos");
  }
};

const sendMail = (event) => {
  event.preventDefault();
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "lucaschcobarferreyra@gmail.com",
    Password: "BCB1933977393C8B3360A50698B1D118FEB9",
    To: emailReg.value,
    From: "lucaschcobarferreyra@gmail.com",
    Subject: "Gracias por registrarte",
    Body: "Estamos contentos de que formes parte de nuestra comunidad.",
  }).then(() => alert("Se ha registrado su cuenta"));
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
