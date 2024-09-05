/// <reference types="cypress" />
describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Добавление ингредиентов', () => {
    cy.get('[data-cy=bun-ingredient]').contains('Добавить').click();
    cy.get('[data-cy=bun-top]').contains('Булка1').should('exist');
    cy.get('[data-cy=bun-bottom]').contains('Булка1').should('exist');
  });

  it('Добавление начинки и соуса', () => {
    cy.get('[data-cy=main-ingredient]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredient]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Начинка1')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус1')
      .should('exist');
  });
});

describe('Открытие и закрытие модального окна с описанием ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Открытие модального окна с отображением элемента, по которому произошел клик', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Начинка1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal]').contains('Начинка1').should('exist');
  });

  it('Закрытие модального окна по клику на крестик', () => {
    cy.contains('Начинка1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-modal]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.contains('Начинка1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('right', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post-order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Создание заказа', () => {
    cy.get('[data-cy=bun-ingredient]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredient]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredient]').contains('Добавить').click();
    cy.get('[data-cy=order-button]').click();

    cy.get('[data-cy=modal]').should('exist').and('be.visible');
    cy.get('[data-cy=order-number]').contains('12345').should('exist');

    cy.get('[data-cy=close-modal]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=burger-constructor]')
      .contains('Булка1')
      .should('not.exist');
    cy.get('[data-cy=burger-constructor]')
      .contains('Начинка1')
      .should('not.exist');
    cy.get('[data-cy=burger-constructor]')
      .contains('Соус1')
      .should('not.exist');
  });
});
