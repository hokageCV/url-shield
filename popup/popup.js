const redirectUrlBtn = document.getElementById("redirect-url-btn");
const addKeywordBtn = document.getElementById("add-keyword-btn");

const contentBtn = document.getElementById("content-btn");
contentBtn.addEventListener("click", () => {
    const message = { command: "change content text color" };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id, message);
        }
    });
});
