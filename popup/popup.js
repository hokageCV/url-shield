const redirectUrlInput = document.getElementById("redirect-url-input");
const addKeywordInput = document.getElementById("add-keyword-input");

redirectUrlInput.addEventListener("keydown", async (e) => {
    let keyCode = e.code || e.key;
    if (keyCode === "Enter") {
        e.preventDefault();

        if (isURL(redirectUrlInput.value)) {
            await chrome.storage.local.set({ redirectUrl: redirectUrlInput.value });

            redirectUrlInput.placeholder = redirectUrlInput.value;
            redirectUrlInput.value = "";
        }
    }
});

function isURL(str) {
    try {
        new URL(str);
        return true;
    } catch (error) {
        return false;
    }
}
