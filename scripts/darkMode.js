const darkModeToggle = document.querySelector("#dark-mode");
const main = document.querySelector("body");

darkModeToggle.addEventListener("click", () => {
    darkModeToggle.classList.toggle('dark');
    main.classList.toggle('dark');
});