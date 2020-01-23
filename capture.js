const pw = require('playwright');
const fs = require('fs').promises;
const referenceImagesDir = "./reference_images"
let browser

const capture = async (viewport, userAgent, website) => {
  const context = await browser.newContext({
    viewport: viewport,
    userAgent: userAgent
  });

  const page = await context.newPage(website);
  const result = await page.screenshot({ fullPage: true, type: "png" });

  return result
}

module.exports = {
  capture,
  captureAndWriteToFile: async (viewport, userAgent, website) => {
    const path = `${referenceImagesDir}/reference.png`
    await fs.mkdir(referenceImagesDir, { recursive: true }).catch(console.error);
    await fs.writeFile(path, await capture(viewport, userAgent, website))
    return path
  },
  start: async () => browser = await pw.webkit.launch(),
  close: async () => await browser.close()
}
