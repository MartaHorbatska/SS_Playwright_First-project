import { test, expect } from '@playwright/test';

/* Task 1.
Напишіть тест Playwright, який виконує такі дії:
§ Перейдіть на веб-сайт https://example.com/.
§ Переконайтеся, що назва сторінки "Example Domain" за допомогою toBe().
§ Переконайтеся, що URL-адреса сторінки містить підрядок "example.com", використовуючи toContain().
§ Переконайтеся, що сторінка містить текст «This domain is for use in illustrative examples» за допомогою toMatch().
§ Переконайтеся, що текст елемента <h1> точно відповідає "Example Domain", використовуючи toHaveText() */

test("test1_example.com validation", async ({ page }) => {
    await page.goto('https://example.com/');
    const title = await page.title();
    expect(title).toBe('Example Domain');
    const currentUrl = page.url();
    expect(currentUrl).toContain('example.com');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toMatch(/This domain is for use in illustrative examples/);
    await expect(page.locator('h1')).toHaveText('Example Domain');
});

test("test1_example.com validation2", async ({ page }) => {
    await page.goto('https://example.com/');
    expect(await page.title()).toBe('Example Domain');
    expect(page.url()).toContain('example.com');
    expect(await page.locator('body').innerText()).toMatch(/This domain is for use in illustrative examples/);
    await expect(page.locator('h1')).toHaveText('Example Domain');
  });

/* Task 2.
Напишіть тест Playwright, який виконує такі дії:
§ Перейдіть на домашню сторінку Playwright https://playwright.dev/
§ Переконайтеся, що URL-адреса сторінки починається з "https://playwright.dev", використовуючи startsWith().
§ Переконайтеся, що сторінка містить посилання з текстом «Get started», використовуючи toHaveCount().
 */

test("test2_playwright.dev validation", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const currentUrl = page.url();
    expect(currentUrl.startsWith("https://playwright.dev")).toBeTruthy();
    const getStartedLinks = page.getByRole('link', { name: 'Get started' });
    await expect(getStartedLinks).toHaveCount(1);
}); 

/* Task 3.
Створіть тест за допомогою Playwright, який виконує такі дії:
§ Перейти на сайт https://www.google.com.
§ Знайти поле пошуку і ввести в нього пошуковий запит "Playwright"
§ Надіслати пошуковий запит, активувавши відповідну кнопку
§ Перевірити, чи пошуковий запит успішний на сторінці із результатами пошуку */

test("test3_search in Google", async ({ page }) => {
  await page.goto('https://www.google.com');
  const acceptBtn = page.getByRole('button', { name: /прийняти/i });
  if (await page.getByRole('button', { name: /прийняти/i }).isVisible()) {
    await page.getByRole('button', { name: /прийняти/i }).click();
  }
  await page.locator('input[name="q"]').fill('Playwright');
  await page.locator('input[name="q"]').press('Enter');
  await expect(page.locator('#search')).toBeVisible();
  await expect(page.locator('#search').locator('text=Playwright').first()).toBeVisible();
});

/* Task 4.
Створіть тест за допомогою Playwright, який виконує такі дії:
§ Перейдіть на домашню сторінку Playwright https://playwright.dev/ .
§ Переконайтеся, що в назві сторінки є слово «Playwright».
§ Натисніть на домашній сторінці посилання «Get started».
§ Переконайтеся, що URL-адреса нової сторінки містить /docs. */

test("test4_playwright /docs page validation", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/.*\/docs.*/);
});

