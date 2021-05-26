<p align="center">
    <image src="./icons/icon.svg" width="250px"/>
</p>

## About
**MSD** (Musescore Downloader) is a browser extension, that lets you download PDFs from https://musescore.com/. Previously, this extension also supported the option to download MIDI and MP3 files, but that is no longer working. MSD uses four external libraries to work. It uses the pre-built browser version of [PDFKit](https://github.com/foliojs/pdfkit) to create PDF files, the [blob-stream](https://github.com/devongovett/blob-stream) module to turn the PDFKit generated stream into a [HTML5 Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object, [SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit) to add SVG support to PDFKit, and finally the [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) to add support for using this extension in multiple browsers.

## Installing
### Chromium/Others
On most Chromium based browsers, you can install the extension trough the Chrome Web Store [here](https://chrome.google.com/webstore/detail/musescore-downloader/bglnniclnbhchenijehpcihdobcmedol), or you can:
1. Downloading the extension as a `.zip` file [here](https://github.com/jonassterud/msd/releases/latest).
2. Unzip it.
3. Type `about://extensions` into your address bar and press enter.
4. Turn on "Developer mode", and then choose the "Load unpacked extension" option.

### Firefox
On Firefox, you can:
1. Dowload the `.xpi` file [here](https://github.com/jonassterud/msd/releases/latest).
2. Drag the `.xpi` file into any empty Firefox window.
3. Or, you type `about:addons` into your address bar, press enter.
4. Then, click on the cogwheel icon and choose the "Install Add-On From File..." option.

## How to use
[Video guide here](https://youtu.be/zhobldVPI18)

## Issues
Musescore often updates their website, and there is a chance that this extension might then temporarily break. I often get many error reports on the actual chrome extension, but posting them here is preferred. When reporting a issue, try to include as much information as possible (operating system, browser, extension version, etc.), and try your best to describe the issue in detail.

## Contributing
If you solved a bug, cleaned up some code, or anything else, feel free to send a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) for details.
