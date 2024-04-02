import * as pdfjs from "pdfjs-dist";

import fs from "fs"
async function getTextFromPDF(pdfPath) {
    if(pdfPath === "")
    {
        return
    }
    else
    {
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjs.getDocument(data);
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    let text = '';

    for (let i = 1; i <= numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        text += strings.join(' ');
    }

    return text;
}
}

// Usage example
export {getTextFromPDF}