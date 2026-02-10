import { test, expect } from '@playwright/test';

test.describe('Hero és nyelvváltás', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/hu'); // alap nyelv
  });

  test('Hero gomb kattintható és navigál', async ({ page }) => {
    const heroButton = page.getByText('Induljon a sztori');
    await heroButton.click();

    // Ellenőrizzük, hogy cikk listába megy
    await expect(page).toHaveURL(/articles/);
  });

  test('Nyelvváltás és back gomb', async ({ page }) => {
    // Angolra váltás
    await page.getByText('EN').click();
    await expect(page).toHaveURL('/en');

    // Vissza gomb
    await page.getByText('← Vissza').click();
    // URL marad angol
    await expect(page).toHaveURL('/en');
  });

});
