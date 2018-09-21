/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is RSS Feed Suite, which contains a related set of tests. This suit is all about 
     * the RSS feeds definations and the allFeeds variable in the application
     */
    describe('RSS Feeds', function () {
        /* This is the first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function () {
        /* A test that ensures the menu element is
         * hidden by default. 
         * Searches class menu-hidden in the body tag,
         * if it is true then the menu is hidden.
         */
        it('is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        })
        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: the menu display when
         * clicked and it hide when clicked again.
         */
        it('menu changes visibility on click', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    });
    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* Call a Jasmine's beforeEach to do an asynchronous done() function.*/

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('completes work', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        //A test that ensures when a new feed is loaded by the loadFeed function that the content actually changes
        //loadFeed() is asynchronous.

        let firstFeed;

        beforeEach(function (done) {

            loadFeed(0, function () {

                //store first feed and check
                firstFeed = $('.feed').html();

                //load newer feed
                loadFeed(1, done);

            });

        });

        it('is different from first feed (content changes)', function () {
            expect($('.feed').html()).not.toBe(firstFeed);
        });

    });
}());