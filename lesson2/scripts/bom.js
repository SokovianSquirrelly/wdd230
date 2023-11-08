const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", () => {
  console.log("clicked");

  if (input.value) {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    li.textContent = input.value;
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", function () {
      list.removeChild(li);
      input.focus();
      input.value = '';
    });
    li.append(deleteButton);
    list.append(li);
  } else {
    input.focus();
    feedback.textContent = "Please enter a value";
  }
});
