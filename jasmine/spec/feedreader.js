/* feedreader.js
 *
 * this is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* we're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

  var entriesStart,
      entriesEnd;

    // first test suite contains related set of tests.(the RSS feeds definitions, allFeeds variable in our application).
    describe('RSS Feeds', function() {

        // first test define allFeeds variable and it is not empty.
        it('allfeeds variable are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         // second test loops through each feed in the allFeedsobject and ensuring if allFeeds have a url also that the url is not empty.
         it('allfeeds have url', function () {
             for (var i = 0; i < allFeeds.length; i++) {
                 expect(allFeeds[i].url).toBeDefined();
                 expect(allFeeds[i].url.length).not.toBe(0);
             }
         });

        // third test loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
        it('allfeeds names are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    // second test suite named "The menu".
    describe('The Menu', function () {

        // test ensures that the menu element is hidden by default.
       // by analyzing the HTML, CSS file to check if there is a class element (.'menu-hidden')in the body tag.
      // if its true the menue will be hidden.

         it('menu element is hidden', function () {
             expect($('body').hasClass('menu-hidden')).toEqual(true);
         });

         // test that ensures the menu changes visibility toggles on click event (if the menu appears or disappears).
         it('working toggle on click event', function () {

             // calls the class of 'menu-icon-link'.
             $('.menu-icon-link').trigger('click');
             expect($('body').hasClass('menu-hidden')).toBe(false);
             $('.menu-icon-link').trigger('click');
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });
     });

    // third test suite named "Initial Entries".
    describe('Initial Entries', function () {

        // test calls a function to do an asynchronous request, ensures the loadFeedfunction is called and completes its work.
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

         // tests if there is at least a single .entry element within the .feed container.
         it('define if feed has at least a single entry', function () {
             expect($('.feed .entry').length).toBeGreaterThan(0);
         });
     });

    // fourth test suite named "New Feed Selection".
    describe('New Feed Selection', function() {

      //test ensures that when a new feed is loaded by the loadFeedfunction that the content actually changes.
      beforeEach(function(done) {
        $('.feed').empty();
        loadFeed(0, function () {
          entriesStart = $('.feed').find(allFeeds.url);
          done();
        });
        loadFeed(1, function () {
          entriesEnd = $('.feed').find(allFeeds.url);
          done();
        });
      });
      it('new feed loaded via loadfeedfunction changes', function () {
        expect(entriesStart).not.toBe(entriesEnd);
      });
    });
  }());
