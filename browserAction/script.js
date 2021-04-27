window.onload = async () => {
    const button = document.querySelector("input[type='button']");
    const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    button.addEventListener("click", () => {
        button.value = "loading..";
        browser.tabs.sendMessage(tabs[0].id, { // Send to content_script
            id: "msd-start"
        })
        .catch((error) => {
            logMessage({
                id: "msd-log",
                content: `Something went wrong. Make sure the page has fully loaded.\nError: ${error.message}`
            });
        });
    });
}

browser.runtime.onMessage.addListener(logMessage);

function logMessage(message) {
    const statusElement = document.querySelector("#status");
    if (message.id === "msd-log") {
        if (statusElement) {
            statusElement.innerText = message.content;
        } else {
            alert(message.content);
        }
    }
}