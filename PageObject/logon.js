var logonCommands = {
	logon : function(){
		//this.api.pause(1000);
		return this.waitForElementVisible('@logonButton',1000)
		.click('@logonButton')
		.waitForElementNotPresent('@logonButton',5000);
	}
	
};

module.exports = {
	commands:[logonCommands],
  	elements: {
    	username: { 
      		selector: '//input[@id="username"]',
    	},
	    password: { 
	      	selector: '//input[@id="password"]', 
	    },
	    logonButton : {
	    	selector: '//a[@id="logonBtn"]',
	    }
  	}
};