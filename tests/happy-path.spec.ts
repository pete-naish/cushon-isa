import { test, expect } from "@playwright/test";

test("Fund selection and deposit process", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.locator("h1")).toContainText("Cushon Stocks & Shares ISA");

  await expect(page.getByTestId("filter-result-count")).toContainText(
    "Showing 5 of 5"
  );

  await page.getByTestId("filter-Equities").click();

  await expect(page.getByTestId("filter-result-count")).toContainText(
    "Showing 2 of 5"
  );

  await page
    .getByTestId("select-checkbox-18aade0e-22be-4791-a8f7-7f3e901b3or0")
    .click();

  await expect(page.getByTestId("deposit-banner-submit-button")).toBeDisabled();

  await expect(page.getByTestId("fund-row")).toContainText(
    "Cushon Equities Fund"
  );

  await page.getByTestId("fund-row-deposit-input").pressSequentially("1000");

  await expect(
    page.getByTestId("deposit-banner-submit-button")
  ).not.toBeDisabled();
});
