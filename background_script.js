browser.runtime.onMessage.addListener((message) => {
    if (message.id === "msd-create") {
        // Create PDF here
    }

    // Download PDF, and remove loading class from pop-up button
});