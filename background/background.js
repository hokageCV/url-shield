console.log("background is running");

chrome.runtime.onInstalled.addListener(async (e) => {
    if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        console.log("installed");

        /**
         * @param {string} redirectURL - URL for redirection
         */
        await chrome.storage.local.set({ redirectUrl: "" });

        /**
         * @param {string[]} keywords - array of keywords
         */
        await chrome.storage.local.set({ keywords: [] });
    } else if (e.reason === "update") {
        console.log("Antauri Sprx! Gibson! Nova! Otto! REELOD!");
    }
});
