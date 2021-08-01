chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({ shows: [] });
  chrome.contextMenus.create({
    title: "Search Tv Show",
    id: "searchTvShow",
    contexts: ["page", "selection"],
  });

  chrome.contextMenus.create({
    title: "Read selected text",
    id: "readText",
    contexts: ["page", "selection"],
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === "searchTvShow") {
      fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
        .then((res) => res.json())
        .then((data) => {
          chrome.storage.local.set({
            shows: data,
            text: event.selectionText,
          });
        });
    } else if (event.menuItemId === "readText") {
      chrome.tts.speak(event.selectionText, {
        // lang: "ru" //can be used Turkish/Turkmen :)
        rate: 0.7,
      });
    }
  });
});
