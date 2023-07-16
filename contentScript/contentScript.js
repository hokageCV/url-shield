console.log("content script is running");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "change content text color")
        document.getElementsByTagName("body")[0].style.color = "#82fff3";
});
