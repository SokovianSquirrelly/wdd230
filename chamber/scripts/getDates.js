const today = new Date();
const ONE_DAY_TIMESTAMP_DIFF = 86400000;

let lastModifiedElement = document.querySelector('#lastModified');
lastModified.textContent = document.lastModified;

const discoverMessage = document.querySelector("#discovery-visits");
const lastVisit = localStorage.getItem("lastDiscoverVisit");

if (!lastVisit) {
    discoverMessage.textContent = "Welcome!  Let us know if you have any questions.";
} else {
    let timeDifference = Date.now() - lastVisit;
    if (timeDifference < ONE_DAY_TIMESTAMP_DIFF) {
        discoverMessage.textContent = "Back so soon!  Awesome!";
    } else {
        let daysPassed = Math.floor(timeDifference / ONE_DAY_TIMESTAMP_DIFF);
        if (daysPassed == 1) {
            discoverMessage.textContent = "You last visited 1 day ago.";
        }
        else {
            discoverMessage.textContent = `You last visited ${daysPassed} days ago.`;
        }
    }
}

localStorage.setItem("lastDiscoverVisit", Date.now());