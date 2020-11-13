/* BACKGROUND SCRIPT */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let data = JSON.parse(request?.detail || "null");
    switch(request.id) {
        case "msd-popup":
            chrome.pageAction.show(sender.tab.id);
            break;
        case "msd-fetch":
            // Check for errors with URL
            if(!data?.url?.length) {
                return sendResponse({
                    detail: JSON.stringify({
                        state: "error",
                        data: "Invalid image URL"
                    })
                });
            };

            // Send XML request and send data as response
            let xhr = new XMLHttpRequest();
            xhr.open("GET", data.url);
            xhr.responseType = (data.isPNG ? "arraybuffer" : "");
            xhr.send();

            xhr.addEventListener("load", () => {
                if(data.isPNG) {
                    return sendResponse({
                        detail: JSON.stringify({
                            state: "success",
                            data: Array.from(new Uint8Array(xhr.response))
                        })
                    });
                } else {
                    return sendResponse({
                        detail: JSON.stringify({
                            state: "success",
                            data: xhr.response
                        })
                    });
                }
            });
            break;
        case "msd-download":
            // Check for errors with URL
            if(!data?.url) {
                return sendResponse({
                    detail: JSON.stringify({
                        state: "error",
                        data: "Invalid download URL"
                    })
                });
            }

            // Start download
            chrome.downloads.download({
                filename: "score.pdf",
                url: data.url,
                conflictAction: "prompt",
                saveAs: true
            }, () => {
                chrome.runtime.sendMessage({id: "msd-finished"});
            });
            break;
    }
    return true; // Fixes weird bug
});