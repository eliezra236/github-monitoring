const capture_website = import('capture-website');

async function testCapture() {
    const capture = await capture_website;
    const result = await capture.default.file("https://github.com/eliezra236/app-to-monitor/pull/1", 'screenshot.png');
    console.log(result);
}

testCapture();