declare namespace Cypress {
    interface Chainable<Subject = any> {
        interceptApiCalls(): Chainable<any>;
    }
}
