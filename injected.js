/* WEB ACCESSIBLE RESOURCE */

(function() {
    // Check for errors
    if(!/musescore.com\/.+\/.+/.test(document.location.href)) {
        return alert("This doesn't look like a score page");
    }
    else if(screen.availWidth - window.innerWidth != 0) {
        if(confirm("Please maximize, and then reload, the window before using this extension")) {
            return location.reload();
        }
    }

    // Gather data
    let scoreContainer = document.querySelector("img[src*=score_]")?.parentElement?.parentElement;
    let pageCount = scoreContainer?.querySelectorAll(".vAVs3")?.length;
    let urls = [];

    // Check data for errors
    if(!scoreContainer) {
        return alert("Wasn't able to find score");
    } 
    else if(!pageCount) {
        pageCount = parseInt(prompt("Wasn't able to find page count, please set manually:"), 10);
    }

    // Scroll down page and load images
    (function loop(i=0) {
        const MAX_PAGE_COUNT = 200;
        if(i >= MAX_PAGE_COUNT) return;

        scoreContainer.scrollTo(0, i * (scoreContainer.scrollHeight / pageCount));
        setTimeout(() => {
            // Find correct image
            let loadedImages = [...scoreContainer.querySelectorAll("img")].map(e => e?.src);
            let image = loadedImages.find(e => e.includes("score_" + i));

            if(!image) return loop(i);
            else urls.push(image);
            if(i + 1 < pageCount) return loop(i + 1);
            else return finish();
        }, 100);
    })();

    // Send data to content script
    function finish() {
        scoreContainer.scrollTo(0, 0);
        document.dispatchEvent(new CustomEvent("msd-ready", {
            detail: JSON.stringify({
                pageCount: pageCount,
                urls: urls
            })
        }));
    }
})();
