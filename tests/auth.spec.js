const { test, expect } = require('@playwright/test');
const { login, validPassword, invalidPassword } = require('../user'); 

test.beforeEach(async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
});

test('valid login test', async ({ page }, testInfo) => {
    // Заполнение полей
    await page.getByRole('textbox', { name: 'Email' }).fill(login);
    await page.screenshot({ path: `screenshots/${testInfo.title}-fillLogin.png` });
    await page.getByRole('textbox', { name: 'Пароль' }).fill(validPassword);
    await page.screenshot({ path: `screenshots/${testInfo.title}-fillPassword.png` });
    await page.getByTestId('login-submit-btn').click();

    // Ожидание перехода
    await expect(page).toHaveURL(/netology\.ru\/profile/);
    await page.screenshot({ path: `screenshots/${testInfo.title}-displayProfile.png` });

    // Проверка контента на странице профиля
    await expect(page.getByTestId('header-top').getByTestId('header-navigatorBtn')).toBeVisible();
  });

  test('invalid login test', async ({ page }, testInfo) => {
    // Заполнение полей
    await page.getByRole('textbox', { name: 'Email' }).fill(login);
    await page.screenshot({ path: `screenshots/${testInfo.title}-fillLogin.png` });
    await page.getByRole('textbox', { name: 'Пароль' }).fill(invalidPassword);
    await page.screenshot({ path: `screenshots/${testInfo.title}-fillPassword.png` });
    await page.getByTestId('login-submit-btn').click();

    // Проверка ошибки
    await expect(page.getByTestId('login-error-hint')).toBeVisible();
    await expect(page.getByTestId('login-error-hint')).toContainText('Вы ввели неправильно логин или пароль');
    await page.screenshot({ path: `screenshots/${testInfo.title}-displayError.png` });
});