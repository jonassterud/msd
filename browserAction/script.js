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
            alert(`Something went wrong. Make sure the page has fully loaded. Error: ${error.message}`);
        });
    });
}