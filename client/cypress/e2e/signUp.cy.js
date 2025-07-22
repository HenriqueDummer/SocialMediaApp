const signInFormElements = {
    emailInput: () => cy.get('input[name="email"]'),
    usernameInput: () => cy.get('input[name="username"]'),
    fullNameInput: () => cy.get('input[name="fullName"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    confirmPasswordInput: () => cy.get('input[name="confirmPassword"]'),
    submitButton: () => cy.get('button[type="submit"]'),
    submitForm: () => signInFormElements.submitButton().click()
}

describe('Sign up form', () => {
    beforeEach(() => {
        cy.visit('/sign-up')
    })
    const apiBaseUrl = Cypress.env('apiBaseUrl')

      it('Renders all fields correctly', () => {

        signInFormElements.emailInput()
        signInFormElements.usernameInput()
        signInFormElements.fullNameInput()
        signInFormElements.passwordInput()
        signInFormElements.confirmPasswordInput()
        signInFormElements.submitButton()
      })

      it('Shows error on empty submit', () => {
        signInFormElements.submitForm()
        cy.contains('Email is required')
        cy.contains('Password is required')
        cy.contains('Username is required')
        cy.contains('Full name is required')
      })

      it('Shows error non email format', () => {
        signInFormElements.submitForm()
        signInFormElements.emailInput().type('test')
        signInFormElements.passwordInput().type('123456');
        cy.contains('Invalid email')
      })

      it('Shows error on less than 6 characters password', () => {
        signInFormElements.submitForm()
        signInFormElements.emailInput().type('test@gmail.com')
        signInFormElements.passwordInput().type('12345')
        cy.contains('Password must be at least 6 characters long!')
      })

      it('Shows error on existing email', () => {
        signInFormElements.fullNameInput().type("Test full name")
        signInFormElements.usernameInput().type("Test_username")
        signInFormElements.emailInput().type('john@gmail.com')
        signInFormElements.passwordInput().type('123456')
        signInFormElements.confirmPasswordInput().type('123456')
        signInFormElements.submitForm()
        cy.contains("Email already exists")
      })

     it('Shows error on full name less than 2 char long', () => {
        signInFormElements.fullNameInput().type("T")
        signInFormElements.usernameInput().type("Test_username")
        signInFormElements.emailInput().type('john@gmail.com')
        signInFormElements.passwordInput().type('123456')
        signInFormElements.confirmPasswordInput().type('123456')
        signInFormElements.submitForm()
        cy.contains("Full name must be at least 2 characters long")
      })

      it('Shows error on username less than 2 char long', () => {
        signInFormElements.fullNameInput().type("Test full name")
        signInFormElements.usernameInput().type("T")
        signInFormElements.emailInput().type('john@gmail.com')
        signInFormElements.passwordInput().type('123456')
        signInFormElements.confirmPasswordInput().type('123456')
        signInFormElements.submitForm()
        cy.contains("Username must be at least 2 characters long")
      })

      it('Shows error on full name more than 16 char long', () => {
        signInFormElements.fullNameInput().type("Test long full name")
        signInFormElements.usernameInput().type("Test_username")
        signInFormElements.emailInput().type('john@gmail.com')
        signInFormElements.passwordInput().type('123456')
        signInFormElements.confirmPasswordInput().type('123456')
        signInFormElements.submitForm()
        cy.contains("Full name must have less than 16 characters")
      })

      it('Shows error on username more than 16 char long', () => {
        signInFormElements.fullNameInput().type("Test full name")
        signInFormElements.usernameInput().type("Test_very_long_username")
        signInFormElements.emailInput().type('john@gmail.com')
        signInFormElements.passwordInput().type('123456')
        signInFormElements.confirmPasswordInput().type('123456')
        signInFormElements.submitForm()
        cy.contains("Username must have less than 16 characters")
      })

      it('Shows error on username with spaces', () => {
        signInFormElements.fullNameInput().type("Test full name")
        signInFormElements.usernameInput().type("test with space")
        signInFormElements.emailInput().type('john@gmail.com')
        signInFormElements.passwordInput().type('123456')
        signInFormElements.confirmPasswordInput().type('123456')
        signInFormElements.submitForm()
        cy.contains("Username must not contain spaces")
      })

      it('Shows error on missmatch passwords', () => {
        signInFormElements.fullNameInput().type("Test full name")
        signInFormElements.usernameInput().type("test_username")
        signInFormElements.emailInput().type('john@gmail.com')
        signInFormElements.passwordInput().type('123456')
        signInFormElements.confirmPasswordInput().type('1234567')
        signInFormElements.submitForm()
        cy.contains("Passwords do not match")
      })

    it('Calls the API and handle response correctly', () => {
        cy.intercept('POST', apiBaseUrl + '/auth/sign-up', {
            statusCode: 200,
        }).as('signup');

        signInFormElements.fullNameInput().type("Test full name")
        signInFormElements.usernameInput().type("test_username")
        signInFormElements.emailInput().type('john@gmail.com')
        signInFormElements.passwordInput().type('123456')
        signInFormElements.confirmPasswordInput().type('123456')
        signInFormElements.submitForm()

        cy.wait('@signup').its('response.statusCode').should('eq', 200);
    });
})