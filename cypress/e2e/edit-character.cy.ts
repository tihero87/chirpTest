describe('Character Edit Test', () => {
  it('successfully edit character and the changes are saved on the main page', () => {
    cy.visit('http://localhost:5005/');

    // Проверяем наличие списка персонажей
    cy.get("[data-automation-id='character-list']", { timeout: 15000 }).should('exist');

    // Кликаем на первую карточку персонажа
    cy.get("[data-automation-id='character-card']").first().click();

    // Проверяем, что открылась страница с деталями персонажа
    cy.get("[data-automation-id='character-item']", { timeout: 12000 }).should('exist');

    // Кликаем на кнопку редактирования
    cy.get("[data-automation-id='character-item'] button").click();

    // Меняем имя персонажа на
    cy.get("[data-automation-id='character-item']").within(() => {
      cy.get('input').clear().type('TestName');
    });

    // Кликаем на кнопку сохранения
    cy.get("[data-automation-id='character-item'] button").click();

    // Убедимся что новое имя персонажа отображается на странице после сохранения
    cy.contains('TestName').should('exist');

    // Вернемся на главнюу и проверим что и там имя поменялось
    cy.get('button').first().click();
    cy.contains('TestName').should('exist');
  });
});
