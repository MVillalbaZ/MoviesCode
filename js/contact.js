let nameContact = document.querySelector("#name-contact");
let emailContact = document.querySelector("#email-contact");
let phoneContact = document.querySelector("#phone-contact");
let messageContact = document.querySelector("#comment");

const sendMessage = (event) => {
  event.preventDefault();
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "lucaschcobarferreyra@gmail.com",
    Password: "BCB1933977393C8B3360A50698B1D118FEB9",
    To: "lucaschcobarferreyra@gmail.com",
    From: emailContact.value,
    Subject: `De: ${nameContact}`,
    Body: messageContact.value,
  }).then((message) => alert(message));
};
