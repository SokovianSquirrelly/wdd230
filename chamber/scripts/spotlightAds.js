const chamberMembersUrl = "data/members.json";
const spotlightAds = document.getElementById("ads-body");

async function displayEliteMembers() {
  let data = [];

  try {
    const response = await fetch(chamberMembersUrl);
    if (response.ok) {
      data = await response.json();
      console.log(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }

  let eliteMembers = [];

  data.forEach((member) => {
    if (
      member.membershipLevel == "Gold" ||
      member.membershipLevel == "Silver"
    ) {
      eliteMembers.push(member);
    }
  });

  console.log(eliteMembers);

  const adOne = eliteMembers[Math.floor(Math.random() * eliteMembers.length)];
  let adTwo = {};

  do {
    adTwo = eliteMembers[Math.floor(Math.random() * eliteMembers.length)];
  } while (adOne == adTwo);

  console.log(adOne);
  console.log(adTwo);

  const linkOne = document.createElement("a");
  linkOne.setAttribute("href", adOne.websiteURL);
  const linkTwo = document.createElement("a");
  linkTwo.setAttribute("href", adTwo.websiteURL);

  const adOneContainer = document.createElement("section");
  adOneContainer.classList.add("business-ad");
  const adTwoContainer = document.createElement("section");
  adTwoContainer.classList.add("business-ad");

  const imgOne = document.createElement("img");
  const imgTwo = document.createElement("img");

  const captionOne = document.createElement("h4");
  const captionTwo = document.createElement("h4");

  imgOne.setAttribute("src", adOne.imageSource);
  imgOne.setAttribute("alt", adOne.businessName);
  imgOne.setAttribute("loading", "lazy");

  imgTwo.setAttribute("src", adTwo.imageSource);
  imgTwo.setAttribute("alt", adTwo.businessName);
  imgTwo.setAttribute("loading", "lazy");

  captionOne.textContent = adOne.businessName;
  captionTwo.textContent = adTwo.businessName;

  adOneContainer.appendChild(imgOne);
  adOneContainer.appendChild(captionOne);

  adTwoContainer.appendChild(imgTwo);
  adTwoContainer.appendChild(captionTwo);

  linkOne.appendChild(adOneContainer);
  linkTwo.appendChild(adTwoContainer);

  spotlightAds.appendChild(linkOne);
  spotlightAds.appendChild(linkTwo);
}

displayEliteMembers();
