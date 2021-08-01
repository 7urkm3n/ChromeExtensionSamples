const container = document.querySelector("div.container");

const renderTitle = (text) => {
  let title = document.querySelector("h1.title");
  title.contextText = `Searched: ${text}`;
};

const renderShow = (shows) => {
  shows.forEach((data) => {
    console.log("data :>> ", data);
    let a = document.createElement("a");
    a.className = "show";
    a.href = data.show.url;
    a.target = "_blank";

    let span = document.createElement("span");
    span.innerText = data.show.name;

    let img = document.createElement("img");
    img.src = data.show.image ? data.show.image.medium : null;

    a.appendChild(span);
    a.appendChild(img);
    container.appendChild(a);
  });
};

chrome.storage.local.get(["shows", "text"], (res) => {
  renderTitle(res.text);
  renderShow(res.shows);
});
