chrome.runtime.onInstalled.addListener(async (e) => {
    if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        await chrome.storage.local.set({ redirectUrl: "" });
        await chrome.storage.local.set({ keywords: [] });
    } else if (e.reason === "update") {
        console.log("Antauri Sprx! Gibson! Nova! Otto! REELOD!");
    }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const { keywords, redirectUrl } = await chrome.storage.local.get(["keywords", "redirectUrl"]);

    if (changeInfo.status === "complete" && tab.url) {
        const matchedKeyword = keywords.find((keyword) => tab.url.includes(keyword));

        if (matchedKeyword) {
            if (redirectUrl === "" || redirectUrl === undefined) {
                return chrome.tabs.update(tabId, {
                    url: "https://chaitanya-varu-blog.netlify.app",
                });
            }
            chrome.tabs.update(tabId, { url: redirectUrl });
        }
    }
});
