const compareImages = require("resemblejs/compareImages");
const fs = require('fs').promises;

const options = {
  output: {
      errorColor: {
          red: 255,
          green: 0,
          blue: 255
      },
      errorType: "movement",
      transparency: 0.3,
      largeImageThreshold: 1200,
      useCrossOrigin: false,
      outputDiff: true
  },
  scaleToSameSize: true,
  ignore: "antialiasing"
};

module.exports = async function compareToReference(newCaptureBuffer, referenceImagePath) {
  console.log(`referenceImagePath: ${referenceImagePath}`)
  //console.log(`newCaptureBuffer: ${newCaptureBuffer}`)
  const data = await compareImages(
    await fs.readFile(referenceImagePath),
    Buffer.from(newCaptureBuffer),
    options
  )
    .catch(e => console.log(`${e.message}:\n ${e.stack} -\n ${e}`));
  console.log(data)
}
