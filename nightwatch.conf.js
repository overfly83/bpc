require('os');
require('env2')('config/env.json');
require('env2')('config/exclude.json');
const OUTPUTS = 'outputs';
const selenium_server = require('selenium-server-standalone-jar');

var args = require('minimist')(process.argv);
var browserName;
var launchURL;


(function(browser_name,env){
  console.log(process.env.exclude);

	if(!browser_name || typeof browser_name === "boolean"){
		browserName = process.env.browser.trim().toLowerCase();
	}else{
		if(browser_name.toLowerCase().trim().includes('chrome')){
			browserName = 'chrome';
		}else if(browser_name.toLowerCase().trim().includes('ie') || browser_name.toLowerCase().trim().includes('internetexplorer')){
			browserName = 'internet explorer';
		}else if(browser_name.toLowerCase().trim().includes('firefox') || browser_name.toLowerCase().trim().includes('gecko')){
			browserName = 'firefox';
		}else if(browser_name.toLowerCase().trim().includes('edge')){
			browserName = 'MicrosoftEdge';
		}
		
	}
  if(typeof browserName === "undefined"){
    throw new Error("browser: "+browser_name+" is not correctly specified, please specify browser in runtime cmd. e.g. nightwatch --browser=ie");
  }
  if(!env || typeof env ==="boolean"){
    launchURL = process.env.ez4;
  }else{
    launchURL = process.env[env.toLowerCase().trim()];
    
  }
  if(typeof launchURL === "undefined"){
    throw new Error("system: "+env+" does not exist, please specify browser in runtime cmd. e.g. nightwatch --system=ed4");
  }
})(args["browser"],args['system']);


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
  "page_objects_path" : "PageObject",
  "globals_path" : "",

  "output_folder": OUTPUTS + '/reports', // reports (test outcome) output by nightwatch
  'test_workers' : {
    "enabled" : true, 
    "workers" : 2
  },
  "use_xpath" : true, 
  "selenium": { // downloaded by selenium-download module (see readme) 
    "start_process": true, // tells nightwatch to start/stop the selenium process 
    "server_path": selenium_server.path,
    "log_path" : OUTPUTS + '/logs',

      
    "host": "127.0.0.1",
    "port": 4444, // standard selenium port
    "cli_args": {
      "webdriver.chrome.driver" : chromedriver_path,
      "webdriver.gecko.driver" : geckodriver_path,
      "webdriver.ie.driver" : iedriver_path,
      "webdriver.edge.driver" : edgedriver_path
    }
  },

  "test_settings": {
    "default": {
      "exclude" : process.env.exclude,
      
      "screenshots": {
        "enabled": true, // if you want to keep screenshots
        "on_failure": true,
        "on_error": true,
        "path": OUTPUTS + '/screenshots/' // save screenshots here 
      },
      
      'launch_url' : launchURL,
      "globals": {
        "waitForConditionTimeout": 5000
      },
      "desiredCapabilities": {
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

