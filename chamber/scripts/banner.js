const banner = document.getElementById("banner");
const closeButton = document.getElementById("close-button");

const weekday = new Date().getDay()

closeButton.addEventListener("click", () => {
    banner.style.display = "none";
});

if (weekday == 0 || weekday > 3) {
    banner.style.display = "none";
}