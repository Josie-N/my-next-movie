declare namespace Cypress {
    interface Chainable<Subject = any> {
        // API call stubs
        apiStubWatchlistEmpty(): Chainable<any>;
        apiStubWatchlistOneItem(): Chainable<any>;

        // Assertions: homepage
        checkHomepageIsSelected(): Chainable<any>;

        // Assertions: watchlist related
        checkWatchlistIsEmpty(): Chainable<any>;
        checkAddedListIsSelected(): Chainable<any>;

        // General
        checkListIsSelected(): Chainable<any>;
    }
}
