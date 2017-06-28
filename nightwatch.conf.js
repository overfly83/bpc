os = require('os');
const env = require('env2')('env.json');
const SCREENSHOT_PATH = "outputs/screenshots/";
const selenium_server = require('selenium-server-standalone-jar');

var args = require('minimist')(process.argv);
var browserName;
(function(browser_name){
	if(typeof browser_name === "undefined"){
		browserName = process.env.browser.trim().toLowerCase();
	}else{
		if(browser_name.includes('chrome')){
			browserName = 'chrome';
		}else if(browser_name.toLowerCase().trim().includes('ie') || browser_name.toLowerCase().trim().includes('internetexplorer')){
			browserName = 'internet explorer';
		}else if(browser_name.toLowerCase().trim().includes('firefox') || browser_name.toLowerCase().trim().includes('gecko')){
			browserName = 'firefox';
		}else if(browser_name.toLowerCase().trim().includes('edge')){
			browserName = 'MicrosoftEdge';
		}
		
	}
})(args["browser"])

var chromedriver_path, iedriver_path, geckodriver_path, edgedriver_path;
(function(){
	if(process.platform==="win32"){
		chromedriver_path = "bin/driver/chrome/2_30/win/chromedriver.exe"
		iedriver_path = "bin/driver/ie/3_40/IEDriverServer.exe"
		geckodriver_path = "bin/driver/firefox/0_17/win/geckodriver.exe"
		edgedriver_path = "bin/driver/edge/15063/MicrosoftWebDriver.exe"
	}else if(process.platform==="linux"){
		chromedriver_path = "bin/driver/chrome/2_30/linux/chromedriver"
		geckodriver_path = "bin/driver/firefox/0_17/linux/geckodriver"
	}
})();

module.exports = {
  "src_folders": process.env.src_folders,
  "page_objects_path" : "",
  "globals_path" : "",
  "output_folder": "outputs/reports", // reports (test outcome) output by nightwatch
  "selenium": { // downloaded by selenium-download module (see readme) 
    "start_process": true, // tells nightwatch to start/stop the selenium process 
    "server_path": selenium_server.path,
    "log_path" : "outputs/log",
    "host": "127.0.0.1",
    "port": 4444, // standard selenium port 
    "cli_args": { // chromedriver is downloaded by selenium-download (see readme) 
      "webdriver.chrome.driver" : chromedriver_path,
      "webdriver.gecko.driver" : geckodriver_path,
      "webdriver.ie.driver" : iedriver_path,
      "webdriver.edge.driver" : edgedriver_path
    }
  },
  "test_settings": {
    "default": {
      "screenshots": {
        "enabled": true, // if you want to keep screenshots 
        "path": SCREENSHOT_PATH // save screenshots here 
      },
      "globals": {
        "waitForConditionTimeout": 5000 // sometimes internet is slow so wait. 
      },
      "desiredCapabilities": { // use Chrome as the default browser for tests 
        "browserName": browserName,
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "chromeOptions" : {
          "args" : ["--no-sandbox","--test-type"]
        }
      }
    }

  }
}

// /**
//  * selenium-download does exactly what it's name suggests;
//  * downloads (or updates) the version of Selenium (& chromedriver)
//  * on your localhost where it will be used by Nightwatch.
//  /the following code checks for the existence of `selenium.jar` before trying to run our tests.
//  */
 
// // require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it? 
// //   if (err || !stat || stat.size < 1) {
// //     require('selenium-download').ensure(BINPATH, function(error) {
// //       if (error) throw new Error(error); // no point continuing so exit! 
// //       console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
// //     });
// //   }
// // });
 
// function padLeft (count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/ 
//   return count < 10 ? '0' + count : count.toString();
// }
 
// var FILECOUNT = 0; // "global" screenshot file count 
// *
//  * The default is to save screenshots to the root of your project even though
//  * there is a screenshots path in the config object above! ... so we need a
//  * function that returns the correct path for storing our screenshots.
//  * While we're at it, we are adding some meta-data to the filename, specifically
//  * the Platform/Browser where the test was run and the test (file) name.
 
// function imgpath (browser) {
// 	console.log("    browser:   "+browser)
//   var a = browser.options.desiredCapabilities;
//   var meta = [a.platform];
//   console.log("    meta:   "+meta)
//   meta.push(a.browserName ? a.browserName : 'any');
//   meta.push(a.version ? a.version : 'any');
//   meta.push(a.name); // this is the test filename so always exists. 
//   var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
//   return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
// }
// module.exports.imgpath = imgpath;
// module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;