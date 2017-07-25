module.exports = {

  	'Demo test' : function (browser) {
    	browser
      		.url(browser.launch_url)
      		.pause(5000)
      		// ...
      		.end();
  	}
};