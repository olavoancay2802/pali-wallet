// const { strict: assert } = require('assert');
const { render } = require('sass');
const { buildWebDriver } = require('../webdriver');
// const CONSTANTS = require('../constants');
// const { Key, By } = require('selenium-webdriver');

describe('test 1', () => {
  beforeEach(async () => {
    const { driver: webDriver } = await buildWebDriver();
    driver = webDriver;

    driver.navigate();
  });

  afterEach(async () => {
    driver.quit();
  });

  it('should do something', async () => {
    // const walletName = 'wallet' + Math.floor(Math.random() * 1000);

    // await driver.fill('#newAccount-accountNameInput', walletName);
    // await driver.clickElement('#newAccount-confirmButton');
    // await driver.clickElement('#addWallet-finishButton');
    // await driver.clickElement('#settings-wallets');
    // await driver.findElement(`#${walletName}`);

    console.log('doing something');
  });
});

describe('test2', () => {
  it('should appear on the console', () => {
    console.log('It worked');
  });
});

/*describe('first wallet test'),
  () => {
    it('should verify if "Pali Wallet" appear when the extension is opened'),()=> {
      render()
    };
  };
*/
