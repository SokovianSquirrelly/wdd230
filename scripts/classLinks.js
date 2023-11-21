const card = document.querySelector("#class-card");

const linksUrl = "data/links.json";

async function fetchLinks() {
  try {
    const response = await fetch(linksUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayLinks(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayLinks(data) {
    const list = document.createElement("ul");

    data.weeks.forEach((weekOfLinks) => {
        const line = document.createElement("li");
        line.classList.add("lessonLine");
        const weekNode = document.createTextNode(weekOfLinks.week);
        line.appendChild(weekNode);

        weekOfLinks.links.forEach((link) => {
            const divider = document.createTextNode(" | ");
            line.appendChild(divider);
            const newLink = document.createElement("a");
            newLink.setAttribute("href", link.url);
            newLink.textContent = link.title;

            line.appendChild(newLink);
        })
        list.appendChild(line);
    })
    card.appendChild(list);
}

fetchLinks();