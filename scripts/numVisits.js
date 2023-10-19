let numVisits = 1;

if (localStorage.getItem('numVisits')) {
    numVisits = parseInt(localStorage.getItem('numVisits'));
    numVisits++;
}

// TODO: set local storage with numVisits
localStorage.setItem('numVisits', numVisits);

// TODO: display number of visits
let numVisitsSpan = document.querySelector('#number-of-visits');
numVisitsSpan.textContent = numVisits;