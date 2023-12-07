const dSidebar = document.querySelector("#discover-sidebar");
const showSidebar = document.querySelector("#show-sidebar");

showSidebar.addEventListener("click", () => {
    dSidebar.classList.toggle("open");
    showSidebar.classList.toggle("open");
});