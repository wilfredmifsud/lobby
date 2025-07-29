describe("Rock Paper Scissors Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  /**
   * Checks opening balance
   */
  it("should start with 5000", () => {
    cy.get("[data-testid='wallet-balance']").should("contain", "5000");
  });

  /**
   * Bets on 1 positions,
   * Checking if the Bet amount is 500
   * And the value shown in the "You win" matches the one in the header
   */
  it("bet on paper and wait for a confirmation", () => {
    cy.get("[data-testid='bet-paper']").click();
    cy.get("[data-testid='bet-button']").click();

    cy.contains(/YOU WIN/i)
      .parent()
      .find("[data-testid='payout']")
      .invoke("text")
      .then((payoutText) => {
        const payout = parseInt(payoutText, 10);
        expect(payout).to.be.a("number");
        cy.get("[data-testid='header-payout']").should(
          "have.text",
          payout.toString(),
        );
      });

    cy.get("[data-testid='header-bet']").should("have.text", "500");
    cy.get("[data-testid='clear-button']").click();
  });

  /**
   * Bets on 2 positions,
   * Checking if the Bet amount is 1000 (500*2)
   * And the value shown in the "You win" matches the one in the header
   */
  it("bet on 2 positions and wait for a confirmation", () => {
    cy.get("[data-testid='bet-paper']").click();
    cy.get("[data-testid='bet-rock']").click();
    cy.get("[data-testid='bet-button']").click();

    cy.contains(/YOU WIN/i)
      .parent()
      .find("[data-testid='payout']")
      .invoke("text")
      .then((payoutText) => {
        const payout = parseInt(payoutText, 10);
        expect(payout).to.be.a("number");
        cy.get("[data-testid='header-payout']").should(
          "have.text",
          payout.toString(),
        );
      });

    cy.get("[data-testid='header-bet']").should("have.text", "1000");
    cy.get("[data-testid='clear-button']").click();
  });
});
