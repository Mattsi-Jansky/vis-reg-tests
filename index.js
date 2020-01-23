const pw = require('playwright');
const iPhone11 = pw.devices['iPhone 11 Pro'];

const capture = require('./capture')
const compare = require('./compare')

const func = async () => {
  await capture.start()
  const referencePath = await capture.captureAndWriteToFile(iPhone11.viewport, iPhone11.userAgent, 'https://www.google.com')
  const newCaptureBuffer = await capture.capture(iPhone11.viewport, iPhone11.userAgent, 'https://www.google.com')
  await compare(newCaptureBuffer, referencePath)
  await capture.close()
}

func()
