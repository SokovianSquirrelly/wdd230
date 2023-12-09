const pass1 = document.querySelector("#password");
const pass2 = document.querySelector("#confirm");
const message = document.querySelector("#form-message");

pass2.addEventListener("focusout", checkPasswords);

function checkPasswords() {
    if (pass1.value != pass2.value) {
		message.textContent = "❗Passwords DO NOT MATCH!";
		message.style.visibility = "show";
		pass1.style.backgroundColor = "#fff0f3";
		pass1.value = "";
		pass2.style.backgroundColor = "#fff0f3";
		pass2.value = "";
		pass1.focus();

	} else {
		message.style.display = "none";
		pass1.style.backgroundColor = "#fff";
		pass1.style.color = "#000";
		pass2.style.backgroundColor = "#fff";
		pass2.style.color = "#000";
    }
}