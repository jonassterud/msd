/* CONTENT SCRIPT */

// Activate popup
chrome.runtime.sendMessage({id: "msd-popup"});

// Inject script on button press from popup
chrome.runtime.onMessage.addListener(async request => {
    if(request.id === "msd-start") {
        let script = document.createElement("script");
        script.src = chrome.runtime.getURL("injected.js");
        script.addEventListener("load", () => script.remove());
        document.head.appendChild(script);
    }
});

// Download PDF after injected script has gathered data
document.addEventListener("msd-ready", async e => {
    let data = JSON.parse(e?.detail || "null");
    let pageCount = data?.pageCount;
    let urls = data?.urls;
    let isPNG = /score_\d+.png/.test(data?.urls?.[0]);

    // Check data for errors
    if(!data || !pageCount || !urls?.length) {
        if(confirm("Wasn't able to fetch data, please reload the page")) {
            location.reload();
        }
        return;
    }

    // Create PDF document and pipe to blob stream
    let doc = new PDFDocument({
        autoFirstPage: false,
        bufferPages: true,
        size: [595, 842] // A4 @ 72 PPI
    });
    let stream = doc.pipe(blobStream());
    let resCount = 0; // Keep track of current page count

    // Loop URLs, fetch images, and add to document
    for(let i=0; i<pageCount && i<urls.length; i++) {
        chrome.runtime.sendMessage({
            id: "msd-fetch",
            detail: JSON.stringify({
                url: urls[i],
                isPNG: isPNG
            })
        }, raw_fetchRes => {
            // Check if an error occured
            let fetchRes = JSON.parse(raw_fetchRes?.detail || "null");
            if(!fetchRes || fetchRes.state === "error") {
                return alert(fetchRes?.data);
            }

            // Add page(s)
            while(i >= doc.bufferedPageRange().count) doc.addPage();
            doc.switchToPage(i);

            // Handle image type
            if(isPNG) doc.image(new Uint8Array(fetchRes.data).buffer, 0, 0, {fit: [595, 842]});
            else SVGtoPDF(doc, fetchRes.data, 0, 0, {preserveAspectRatio: "16:9"});
            resCount++;

            // Send download request to background script
            if(resCount >= pageCount) {
                doc.end();
                stream.on("finish", () => {
                    chrome.runtime.sendMessage({
                        id: "msd-download",
                        detail: JSON.stringify({
                            url: stream.toBlobURL("application/pdf")
                        })
                    }, raw_downloadRes => {
                        // Check if an error occured
                        let downloadRes = JSON.parse(raw_downloadRes?.detail || "null");
                        if(!downloadRes && downloadRes.state === "error") {
                            return alert(downloadRes?.data);
                        }
                    });
                });
            }
        });
    }
});