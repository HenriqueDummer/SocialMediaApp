const signInFormElements = {
  emailInput: () => cy.get('input[name="email"]'),
  passwordInput: () => cy.get('input[name="password"]'),
  submitButton: () => cy.get('button[type="submit"]'),
  submitForm: () => signInFormElements.submitButton().click()
}

describe('Sign in form', () => {
  beforeEach(() => {
    cy.visit('/sign-in')

  })

  const apiBaseUrl = Cypress.env('apiBaseUrl')

  it('Renders all fields correctly', () => {
    cy.contains('Welcome back')

    signInFormElements.emailInput()
    signInFormElements.passwordInput()
    signInFormElements.submitButton()
  })

  it('Shows error on empty submit', () => {
    signInFormElements.submitForm()
    cy.contains('Email is required')
    cy.contains('Password is required')
  })

  it('Shows error non email format', () => {
    signInFormElements.emailInput().type('test')
    signInFormElements.passwordInput().type('123456');
    signInFormElements.submitForm()
    cy.contains('Invalid email')
  })

  it('Shows error less than 6 characters password', () => {
    signInFormElements.emailInput().type('test@gmail.com')
    signInFormElements.passwordInput().type('12345')
    signInFormElements.submitForm()
    cy.contains('Pasword must be at least 6 characters long!')
  })

  it('Calls the API and handle response correctly', () => {
    cy.log(apiBaseUrl)

    cy.intercept('POST', apiBaseUrl + '/auth/sign-in', {
      statusCode: 200,
      body: { token: 'token' },
    }).as('loginRequest');

    cy.visit('/sign-in');


    signInFormElements.emailInput().type('john@gmail.com');
    signInFormElements.passwordInput().type('john123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('token');
    })
  });
})