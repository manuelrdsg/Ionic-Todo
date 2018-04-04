jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const wd = require('wd');
const driver = wd.promiseChainRemote("http://localhost:4723/wd/hub");
const caps = {"platformName":"iOS","platformVersion":"11.2","deviceName":"iPhone Simulator","app":"/Users/manuelrdsg/Library/Developer/Xcode/DerivedData/IonicApp-efcmlrajezydnfghnrvlmnybmyoa/Build/Products/Debug-iphonesimulator/IonicApp.app","automationName":"XCUITest"};


beforeAll(async () => {
    await driver.init(caps);
    await driver.sleep(3000); // wait for app to load
})

test('Adding Task', async () => {

  // let el6 = await driver.elementByXPath("//XCUIElementTypeApplication[@name=\"IonicApp\"]/XCUIElementTypeWindow[2]/XCUIElementTypeOther");  await el16.sendKeys("Test");
  // await (new wd.TouchAction(driver))
  //   .tap({x: 331, y: 409})
  //   .perform()

  // await (new wd.TouchAction(driver))
  // .tap({x: 105, y: 628})
  // .perform()
    
  // let el1 = await driver.elementByXPath("//XCUIElementTypeApplication[@name=\"IonicApp\"]/XCUIElementTypeWindow[2]/XCUIElementTypeOther");
  // await el1.sendKeys("Test");
  // await (new wd.TouchAction(driver))
  //   .tap({x: 331, y: 410})
  //   .perform()

  // await (new wd.TouchAction(driver))
  // .tap({x: 109, y: 622})
  // .perform()
    
  // await (new wd.TouchAction(driver))
  //   .tap({x: 160, y: 476})
  //   .perform()
      
  await (new wd.TouchAction(driver))
  .tap({x: 95, y: 625})
  .perform()
    
  await (new wd.TouchAction(driver))
    .tap({x: 169, y: 476})
    .perform()
      
  await (new wd.TouchAction(driver))
    .tap({x: 93, y: 474})
    .perform()
      
  await (new wd.TouchAction(driver))
    .tap({x: 55, y: 531})
    .perform()
      
  await (new wd.TouchAction(driver))
    .tap({x: 168, y: 474})
    .perform()
      
  await (new wd.TouchAction(driver))
    .tap({x: 332, y: 410})
    .perform()

});

test('Removing task', async () => {
  // await (new wd.TouchAction(driver))
  // .tap({x: 332, y: 136})
  // .perform()

  await (new wd.TouchAction(driver))
  .tap({x: 332, y: 513})
  .perform()
  
  //await driver.quit();
});

// main().catch(console.log);
