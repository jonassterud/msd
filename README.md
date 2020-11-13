<p align="center">
    <image src="./icons/icon.svg" width="250px"/>
</p>

## About
**MSD** (Musescore Downloader) is a chrome extension, published [here](https://chrome.google.com/webstore/detail/musescore-downloader/bglnniclnbhchenijehpcihdobcmedol), that lets you download PDFs from https://musescore.com/. Previously, this tool also supported the option to download MIDI and MP3 files, but that is no longer working. MSD uses three external libraries to function. It uses the pre-built browser version of [PDFKit](https://github.com/foliojs/pdfkit) to create PDF files, the [blob-stream](https://github.com/devongovett/blob-stream) module to turn the PDFKit generated stream into a HTML5 [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object and finally [SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit) to add SVG support to PDFKit.

## Issues
Musescore often updates their website, and there is a good chance that this tool might then temporarily break. I often get many error reports on the actual chrome extension, but posting them here is preferred. When reporting a issue, try to include as much information as possible (operating system, browser, extension version, etc.), and try your best to describe the issue in detail.

## Contributing
If you solved a bug, cleaned up some code, or anything else, feel free to send a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) for details.
