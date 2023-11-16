let numVisits = 1;

if (localStorage.getItem('numVisits')) {
    numVisits = parseInt(localStorage.getItem('numVisits'));
    numVisits++;
}

// set local storage with numVisits
localStorage.setItem('numVisits', numVisits);

// display number of visits
let numVisitsSpan = document.querySelector('#number-of-visits');
numVisitsSpan.textContent = numVisits;