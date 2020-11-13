/* POPUP SCRIPT */

window.onload = () => {
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