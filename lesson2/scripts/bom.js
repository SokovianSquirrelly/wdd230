const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", () => {
    console.log("clicked");

    if (input.value)
    {
        
    }
    else {
        input.focus()
        feedback.textContent = "Please enter a value"
    }
});

