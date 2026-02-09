/**
 * - Login spec
 *  - should display login page correctly
 *  - should display alert when email is empty
 *  - should display alert when password is empty
 *  - should display alert when username and password are wrong
 *  - should display homepage when username and password are correctly
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    // memverifikasi element yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('achmad.uky@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari api
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // mengisi email salah
    cy.get('input[placeholder="Email"]').type('wrong.email@gmail.com');
    // mengusi password salah
    cy.get('input[placeholder="Password"]').type('wrong.password');

    // klik tombol login denga mengisi email dan password salah
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correctly', () => {
    // mengisi email benar
    cy.get('input[placeholder="Email"]').type('achmad.uky@gmail.com');
    // mengisi password benar
    cy.get('input[placeholder="Password"]').type('Daftar123');

    // klik tombol login dengan mengisi email dan password benar
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi bahwa element yang berada di homepage ditampilkan
    cy.get('nav').contains(/^Threads$/).should('be.visible');
    cy.get('nav').contains(/^Logout$/).should('be.visible');
  });
});