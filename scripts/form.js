const rangeValue = document.getElementById("range-selection");
const range = document.getElementById("rating");

range.addEventListener("change", displayRatingValue);
range.addEventListener("input", displayRatingValue);

function displayRatingValue() {
    rangeValue.textContent = range.value;
}