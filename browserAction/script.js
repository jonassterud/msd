window.onload = async () => {
    const button = document.querySelector("input[type='button']");
    const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    button.addEventListener("click", () => {
        button.classList.add("loading");
        browser.tabs.sendMessage(tabs[0].id, { // Send to content_script.js
            id: "msd-start"
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
        });
    });
}