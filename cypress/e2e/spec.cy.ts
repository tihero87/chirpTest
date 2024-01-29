describe('Character List Test', () => {
  it('successfully loads and shows character list, then navigates to character item', () => {
    // Посещаем главную страницу
    cy.visit('http://localhost:5005/');

    // Проверияем наличие поля для ввода
    cy.get('input').should('have.value', '');

    // Проверяем наличие списка персонажей
    cy.get("[data-automation-id='character-list']", { timeout: 15000 }).should('exist');

    // Кликаем на первую карточку персонажа
    cy.get("[data-automation-id='character-card']").first().click();

    // Проверяем, что открылась страница с деталями персонажа
    cy.get("[data-automation-id='character-item']", { timeout: 12000 }).should('exist');
  });
});
