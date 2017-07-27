var navigationCommands = {
	navigate : function(menupath){
		var menu = menupath.split('/');
		console.log(menu);
		this.waitForElementVisible('@userLabel',50000)
		.click('@menuButton')
		.waitForElementVisible('//ul[@class="bpcMainMenu"]/li//div[@class="menuItemBody"]//div[text()="' + menu[0] + '"]');
	}
};

module.exports = {
	commands:[navigationCommands],
  	elements: {
  		userLabel:{
  			selector: '//label[@id="shell_user_button-text" and string-length(text())>0]',
  			locateStrategy: 'xpath'
  		},
    	menuButton: { 
      		selector: '//button[@id="bpc11-main-menu-button"]',
      		locateStrategy: 'xpath'
    	},
    	navigationMenu: {
    		selector: '//div[@id="mainmenu"]',
    		locateStrategy: 'xpath'
    	},
    	secondMenu: {
    		selector: '//ul[@class="bpcMainMenu"]/li//div[@class="menuItemBody"]//div[text()=' +  + ']',
    		locateStrategy: 'xpath'
    	}

  	}
};