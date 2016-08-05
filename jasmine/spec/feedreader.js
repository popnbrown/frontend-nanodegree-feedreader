/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URLs', function() {
            for(var i=0;i<allFeeds.length;i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        })

        it('have a name', function() {
            for(var i=0;i<allFeeds.length;i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        })

    });


    describe('The menu', function() {
        it('is hidden initially', function() {
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        })

        it('toggles when icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($(document.body).hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        })
    });

    describe('Initial Entries', function() {

        //randomize which feed loads
        beforeEach(function(done) {
            loadFeed(Math.floor(Math.random()*allFeeds.length), done);
        })

        it('exist', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        })
    });

    describe('New Feed Selection', function() {
         var firstFeed;

        //load random feed, after feed loads, load feed before it or if feed id is 0, load last feed
        beforeEach(function(done) {
            var firstFeedID = Math.floor(Math.random()*allFeeds.length);
            var testFeedID = currentFeedID == 0 ? allFeeds.length - 1 : currentFeedID - 1;

            loadFeed(firstFeedID, function(){
                firstFeed = $('.feed').html();
                loadFeed(testFeedID, done);
            });
        })

         it('changes content', function() {
            expect($('.feed').html()).not.toBe(firstFeed);
         })

    });
}());
