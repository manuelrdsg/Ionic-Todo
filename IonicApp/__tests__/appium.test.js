jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const wd = require('wd');
const driver = wd.promiseChainRemote("http://localhost:4723/wd/hub");
const caps = {"platformName":"iOS","platformVersion":"11.2","deviceName":"iPhone Simulator","app":"/Users/manuelrdsg/Library/Developer/Xcode/DerivedData/IonicApp-efcmlrajezydnfghnrvlmnybmyoa/Build/Products/Debug-iphonesimulator/IonicApp.app","automationName":"XCUITest"};


beforeAll(async () => {
    await driver.init(caps);
    await driver.sleep(2000); // wait for app to load
})

test('Adding Task', async () => {
  await (new wd.TouchAction(driver))
  .tap({x: 78, y: 624})
  .perform()
    
  let el16 = await driver.elementByXPath("//XCUIElementTypeApplication[@name=\"IonicApp\"]/XCUIElementTypeWindow[2]/XCUIElementTypeOther");
  await el16.sendKeys("Test");
  await (new wd.TouchAction(driver))
    .tap({x: 331, y: 409})
    .perform()
});

test('Removing task', async () => {
  await (new wd.TouchAction(driver))
  .tap({x: 332, y: 136})
  .perform()

  await driver.quit();
});

// main().catch(console.log);
