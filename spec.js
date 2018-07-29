'use strict';

  var Page = require('./steps/steps.js'); //include another .js file with required code

  //Create new page, actually new browser window
  describe('Task: ', function () {
      var page;

    it('Open page', function () {
      page = new Page
  });

    //Use case steps that are divided for 3 functions by the page where actions are preformed (login, courses, lesson)
    describe('Use case', function () {

      //Login step
      it('Fill login', function () {
        page.login('user10025@example.com', 'password'); //login using credentials
        expect(browser.getCurrentUrl()).toEqual('https://vimbox.skyeng.ru/showcase'); //check that login succeed
      });

      //Select class step - choose type from list, choose level and choose lesson
      it('Select class', function () {
        page.selectClass(); //call functions to select type, leven and lesson, vars are defined in  conf.js file
        expect(browser.getCurrentUrl()).toContain("/materials"); //check that the lesson is open
      });

      //Final step - lesson closes and we check that everything is fine
      it('Close lesson', function () {
        page.closeLesson(); //close lesson by clicking the button
        browser.sleep(3000); //just to show on video that the lesson page is closed
        expect(browser.getCurrentUrl()).toEqual('https://vimbox.skyeng.ru/showcase'); //check that the lesson is closed
      });
  });
})