const redirectUrlInput = document.getElementById("redirect-url-input");
const addKeywordInput = document.getElementById("add-keyword-input");
const keywordListDiv = document.getElementById("keyword-list");

document.addEventListener("DOMContentLoaded", () => {
    renderKeywordList();
});

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

addKeywordInput.addEventListener("keydown", async (e) => {
    let keyCode = e.code || e.key;
    if (keyCode === "Enter") {
        e.preventDefault();

        if (addKeywordInput.value) {
            chrome.storage.local.get(["keywords"], (data) => {
                const keywordsList = data.keywords || [];
                keywordsList.push(addKeywordInput.value);

                chrome.storage.local.set({ keywords: keywordsList }, () => {
                    addKeywordInput.value = "";
                    renderKeywordList();
                });
            });
        }
    }
});

// =========================================================
function renderKeywordList() {
    chrome.storage.local.get(["keywords"], (data) => {
        const keywordsList = data.keywords || [];

        keywordListDiv.innerHTML = "";
        keywordsList.forEach((keyword) => {
            const listItem = document.createElement("li");
            listItem.classList.add("keyword-list-item");
            listItem.textContent = keyword;

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "X";

            deleteBtn.addEventListener("click", () => {
                const newKeywordsList = keywordsList.filter((item) => item !== keyword);
                chrome.storage.local.set({ keywords: newKeywordsList }, () => {
                    renderKeywordList();
                });
            });

            listItem.appendChild(deleteBtn);
            keywordListDiv.appendChild(listItem);
        });
    });
}

// =========================================================

function isURL(str) {
    try {
        new URL(str);
        return true;
    } catch (error) {
        return false;
    }
}
