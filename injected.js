/* WEB ACCESSIBLE RESOURCE */

(function() {
    // Check for errors
    if(!/musescore.com\/.+\/.+/.test(document.location.href)) return alert("This doesn't look like a score page");
    if(screen.availWidth - window.innerWidth != 0) {
        if(confirm("Please maximize, and then reload, the window before using this extension")) {
            return location.reload();
        }
    }

    // Get data
    let scoreContainer = document.querySelector("img[src*=score_]")?.parentElement?.parentElement;
    let pageCount = scoreContainer?.querySelectorAll(".gXB83")?.length;
    let urls = [];

    // Check data for errors
    if(!scoreContainer) return alert("Wasn't able to find score");
    if(!pageCount) {
        pageCount = parseInt(prompt("Wasn't able to find page count, please set manually:"), 10);
    }

    // Scroll down page and load images
    (function loop(i=0) {
        if(i >= 200) return;
        scoreContainer.scrollTo(0, i * (scoreContainer.scrollHeight / pageCount));
        setTimeout(() => {
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