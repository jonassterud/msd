/* POPUP SCRIPT */

window.onload = () => {
    // Send message on button press
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        let pdf = document.getElementById("pdf");
        pdf.addEventListener("click", () => {
            pdf.classList.add("loading");
            chrome.tabs.sendMessage(tabs[0].id, {id: "msd-start"});
        });
    });

    chrome.runtime.onMessage.addListener(request => {
        switch(request.id) {
            case "msd-finished":
                pdf.classList.remove("loading");
                break;
        }
    });
}