const { test, expect } = require('@playwright/test');
const { login, validPassword, invalidPassword } = require('../user'); 

test.beforeEach(async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
});

test('valid login test', async ({ page }) => {
    // Заполнение полей
    await page.getByRole('textbox', { name: 'Email' }).fill(login);
    await page.getByRole('textbox', { name: 'Пароль' }).fill(validPassword);
    await page.getByTestId('login-submit-btn').click();

    // Ожидание перехода
    await expect(page).toHaveURL(/netology\.ru\/profile/);

    // Проверка контента на странице профиля
    await expect(page.getByTestId('header-top').getByTestId('header-navigatorBtn')).toBeVisible();
  });

  test('invalid login test', async ({ page }) => {
    // Заполнение полей
    await page.getByRole('textbox', { name: 'Email' }).fill(login);
    await page.getByRole('textbox', { name: 'Пароль' }).fill(invalidPassword);
    await page.getByTestId('login-submit-btn').click();

    // Проверка ошибки
    await expect(page.getByTestId('login-error-hint')).toBeVisible();
    await expect(page.getByTestId('login-error-hint')).toContainText('Вы ввели неправильно логин или пароль');
});