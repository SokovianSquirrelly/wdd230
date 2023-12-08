const displayButton = document.querySelector("#info-button");
const membershipInfo = document.querySelector("#membership-info-mobile");

displayButton.addEventListener("click", (e) => {
    e.preventDefault();
    membershipInfo.classList.toggle("open");
})