const toggleButton = document.getElementById("toggle-view");
const directory = document.getElementById("directory");
const directoryUrl = "data/members.json";

toggleButton.addEventListener("click", () => {
  directory.classList.toggle("list-view");
  toggleButton.classList.toggle("list-view");
});

async function getDirectoryDetails() {
  let data = {};

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

  if (directory.classList.contains("list-view")) {
  } else {
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
      directory.appendChild(card);
    });
  }
}

getDirectoryDetails();
