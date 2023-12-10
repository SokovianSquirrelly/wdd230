const toggleButton = document.getElementById("toggle-view");
const directoryGrid = document.getElementById("directory-grid");
const directoryList = document.getElementById("directory-list");
const directoryUrl = "data/members.json";

toggleButton.addEventListener("click", () => {
  directoryGrid.classList.toggle("list-view");
  directoryList.classList.toggle("list-view");
  toggleButton.classList.toggle("list-view");
});

async function getDirectoryDetails() {
  let data = [];

  try {
    const response = await fetch(directoryUrl);
    if (response.ok) {
      data = await response.json();
      //console.log(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }

  data.forEach((business) => {
    const card = document.createElement("section");
    const businessImage = document.createElement("img");
    const businessLink = document.createElement("a");
    const buttonSection = document.createElement("div");
    const showHideDetails = document.createElement("button");
    const details = document.createElement("ul");

    card.classList.add("business-section");

    businessImage.setAttribute("src", business.imageSource);
    businessImage.setAttribute("alt", business.businessName);

    businessLink.setAttribute("href", business.websiteURL);
    businessLink.setAttribute("target", "_blank");
    businessLink.textContent = business.businessName;

    buttonSection.classList.add("center-container");

    showHideDetails.addEventListener("click", () => {
      showHideDetails.classList.toggle("showing-details");
      details.classList.toggle("showing-details");
    });

    buttonSection.appendChild(showHideDetails);

    const address = document.createElement("li");
    const phone = document.createElement("li");
    const membership = document.createElement("li");

    address.textContent = business.businessAddress;
    phone.textContent = business.phoneNumber;
    membership.textContent = `Membership: ${business.membershipLevel}`;

    details.appendChild(address);
    details.appendChild(phone);
    details.appendChild(membership);

    card.appendChild(businessImage);
    card.appendChild(businessLink);
    card.appendChild(buttonSection);
    card.appendChild(details);
    directoryGrid.appendChild(card);
  });

  data.forEach((business) => {
    const listEntry = document.createElement("ul");
    const businessName = document.createElement("li");
    const address = document.createElement("li");
    const phone = document.createElement("li");
    const websiteLine = document.createElement("li");
    const website = document.createElement("a");

    businessName.textContent = business.businessName;
    businessName.style.fontWeight = "bold";
    address.textContent = business.businessAddress;
    phone.textContent = business.phoneNumber;
    website.setAttribute("href", business.websiteURL);
    website.setAttribute("target", "_blank");
    website.textContent = "Visit Now";
    websiteLine.appendChild(website);

    listEntry.appendChild(businessName);
    listEntry.appendChild(address);
    listEntry.appendChild(phone);
    listEntry.appendChild(websiteLine);

    directoryList.appendChild(listEntry);
  });
}

getDirectoryDetails();
