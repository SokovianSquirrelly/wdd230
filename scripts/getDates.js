const today = new Date();

let yearElement = document.querySelector('#year');
yearElement.textContent = today.getFullYear().toString();

let lastModifiedElement = document.querySelector('#lastModified');
lastModified.textContent = document.lastModified;