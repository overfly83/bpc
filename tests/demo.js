module.exports = {

  	'Demo test' : function (browser) {
  		var logonpage = browser.page.logon();
  		var navigation = browser.page.navigation.navigation();

  		browser.url(browser.launch_url);
  		logonpage.setValue('@username','zhanged')
  		.setValue('@password','123456')
  		.logon();
  		navigation.navigate("Library");

    	browser.end();
  	}

};