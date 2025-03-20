describe("Başarılı Submit", () => {
  it("Başarılı form doldurulduğunda submit edebiliyorum", () => {
    cy.visit("http://localhost:5173");
    cy.get("input[data-cy='email']").type("test@tester.com");
    cy.get("input[data-cy='password']").type("123456kK@");
    cy.get("input[data-cy='terms']").check();
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/success");
    cy.contains("Login Success!").should("be.visible");
  });
});
describe("Başarısız Submit", () => {
  it("Yanlış email adresi girdim", () => {
    cy.visit("http://localhost:5173");
    cy.get("input[data-cy='email']").type("test@tester");
    cy.contains("Please enter a valid email address").should("be.visible");
    cy.get("button[type='submit']").should("be.disabled");
  });
  it("Yanlış email ve şifre girdim", () => {
    cy.visit("http://localhost:5173");
    cy.get("input[data-cy='email']").type("test@tester");
    cy.get("input[data-cy='password']").type("123456");
    cy.contains("Please enter a valid email address").should("be.visible");
    cy.contains("Password must be at least 8 characters long, have an uppercase letter, a lowercase letter, a number and a special character").should("be.visible");
  });
  it("Email ve şifre doğru ama kuralları kabul etmedim", () => {
    cy.visit("http://localhost:5173");
    cy.get("input[data-cy='email']").type("test@tester.com");
    cy.get("input[data-cy='password']").type("123456kK@");
    cy.get("button[type='submit']").should("be.disabled");
  });
});