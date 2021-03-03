window.onload = () => {
    browser.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const button = document.querySelector("input[type='button']");
        button.addEventListener("click", () => {
            button.classList.add("loading");
            browser.tabs.sendMessage(tabs[0].id, { // Send to content_script.js
                id: "msd-start"
            });
        });
    });
}