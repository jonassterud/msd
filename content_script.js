browser.runtime.onMessage.addListener((message) => {
    if (message.id === "msd-start") {
        const firstImage = document.querySelector("img[src*=score_]");
        const scoreContainer = firstImage?.parentElement?.parentElement;
        const pageCount = scoreContainer?.querySelectorAll("." + firstImage?.parentElement?.classList?.[0])?.length;
        const urls = [];

        if (!firstImage || !scoreContainer) {
            return alert("Wasn't able to find elements. Make sure the page has fully loaded.");
        }
        else if (isNaN(pageCount) || pageCount === 0) {
            pageCount = parseInt(prompt("Page count not found, please set manually:"), 10);
        }

        (function loop(i=0) {
            const MAX_PAGE_COUNT = 200;
            if (i >= MAX_PAGE_COUNT) return alert("Max page count reached.");

            scoreContainer.scrollTo(0, i * (scoreContainer.scrollHeight / pageCount));
            setTimeout(() => {
                const loadedImageURLs = [...scoreContainer.querySelectorAll("img")].map((e) => e.src);
                const imageURL = loadedImageURLs.find((e) => e.includes("score_" + i));

                if (imageURL) urls.push(imageURL);
                else return loop(i);

                if (i + 1 < pageCount) return loop(i + 1);
                else return finish();
            }, 100);
        })();

        function finish() {
            scoreContainer.scrollTo(0, 0);
            browser.runtime.sendMessage({
                id: "msd-create",
                urls: urls
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
        }
    }
});