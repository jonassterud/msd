function onError(error) {
    console.error(`Error: ${error.message}`);
}

browser.runtime.onMessage.addListener((message) => {
    if (message.id === "msd-create") {
        let doc = new PDFDocument({
            autoFirstPage: false,
            bufferPages: true,
            size: [595, 842] // A4 @ 72 PPI
        });
        let stream = doc.pipe(blobStream());
        let resCount = 0;

        for(let i=0; i<message.urls.length; i++) {
            const isPNG = /score_\d+.png/.test(message.urls[0]);
            fetch(message.urls[i])
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.blob();
            })
            .then(async (res) => {
                const data = isPNG ? await res.arrayBuffer() : await res.text();

                while(i >= doc.bufferedPageRange().count) doc.addPage();
                doc.switchToPage(i);

                if(isPNG) doc.image(data, 0, 0, {fit: [595, 842]});
                else SVGtoPDF(doc, data, 0, 0, {preserveAspectRatio: "16:9"});
                resCount++;

                if (resCount >= message.urls.length) {
                    doc.end();
                    stream.on("finish", () => {
                        browser.downloads.download({
                            filename: "score.pdf",
                            url: stream.toBlobURL("application/pdf"),
                            saveAs: true
                        });
                    });
                }
            }).catch(onError);
        }
    }
});