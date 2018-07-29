'use strict';

//Variable defenition. Global params are defined in conf.js

var EC = protractor.ExpectedConditions; //define expected condition var that is useful to avoid sleep ()
var courseButton = element(by.xpath("//div[contains(text(), '"+ browser.params.courseName +"')]")); //define course button selector (Spoken, Business etc)
var levelButton = element(by.xpath("//*[@class='item normal' and contains(string() ,'" + browser.params.levelName + "')]")); //define level button selector (Advanced, Intemediate etc)
var lessonButton = element(by.xpath("//*[@class='tile' and contains(string() ,'" + browser.params.lessonName + "')]")); //define lesson button selector (Food habits, Talking about history etc)
var closeButton = element(by.xpath('//*[@class="root color_gray weight_semibold"]')); //define close lesson button selector

//Page definition. 
var Page = function(){
  browser.get('http://vimbox.skyeng.ru'); //opens browser and goes to defined page
  browser.waitForAngularEnabled(false); //disable waiting for angular. In this code I used expected conditions that are more safe and reliable
  browser.driver.manage().window().maximize();
}

  Page.prototype = Object.create({}, {

    //Login step. Gets username and password from spec.js file
    login:{value: function (username, pass) { 
      browser.wait(EC.elementToBeClickable(element(by.name('_username'))), 5000); //wait until page loads
      element(by.name('_username')).sendKeys(username); //fill the login field
      element(by.name('_password')).sendKeys(pass);  //fill the password field
      browser.actions().sendKeys(protractor.Key.ENTER).perform(); //click enter to login. It's also possible to login clicking the button
      browser.wait(EC.elementToBeClickable(courseButton), 5000); //wait until page loads. I believe it's more logical to start new step from it but I used it there to check if the URL was changed.
    }},

    //Select class step.
    selectClass:{value: function () { 
      courseButton.click(); //button is clickable as we waited for it on previous step, so we can click on it right now
      browser.wait(EC.elementToBeClickable(levelButton), 5000); //wait until level button is loaded
      levelButton.click(); //click on level button 
      browser.wait(EC.elementToBeClickable(lessonButton), 5000); //wait until classes are loaded
      lessonButton.click(); //click on lesson, new page should open
      browser.wait(EC.elementToBeClickable(closeButton), 5000); //wait until page loads to check new url
    }},

    //Close lesson step
    closeLesson:{value: function () { 
      closeButton.click(); //click close button
      browser.wait(EC.elementToBeClickable(courseButton), 5000); //wait until page loads to check new url
    }},
  });

module.exports = Page;
