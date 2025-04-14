import { test, expect } from '@playwright/test';

/* Task 1.
За допомогою Playwright реалізуйте наступний тестовий сценарій: 
§ Перейдіть на веб-сайт https://the-internet.herokuapp.com/login
§ Введіть в поле Username або/і поле Password невалідні дані і натисніть на кнопку Login
§ Переконайтеся, що вам не вдалося залогувалися
§ Введіть в поле Username значення tomsmith
§ Введіть в поле Password значення SuperSecretPassword!
§ Натисніть на кнопку Login.
§ Переконайтеся, що ви успішно залогувалися
§ Вилогуйтеся натиснувши кнопку Logout
§ Переконайтеся, що ви успішно вилогувалися */

test("test1 - login into Herokuapp", async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('#username').fill('invalidData');
    await page.locator('#password').fill('invalidPass');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.flash')).toContainText('You logged into a secure area!');
    await page.locator('a.button.secondary.radius').click();
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });

/* Task 2.
За допомогою Playwright реалізуйте наступний тестовий сценарій: 
§ Перейдіть на веб-сайт https://demo.guru99.com/test/radio.html
§ Активуйте всі наявні на сторінці чекбокси Checkbox1, Checkbox2, Checkbox3
§ Переконайтеся, що всі чекбокси відмічені
§ Деактивуйте всі наявні на сторінці чекбокси Checkbox1, Checkbox2, Checkbox3
§ Переконайтеся, що всі чекбокси не відмічені
 */

test("test2 - guru99 checkbox checking", async ({ page }) => {
    await page.goto('https://demo.guru99.com/test/radio.html');
    await page.check('#vfb-6-0');
    await page.check('#vfb-6-1');
    await page.check('#vfb-6-2');
  
    await expect(page.locator('#vfb-6-0')).toBeChecked();
    await expect(page.locator('#vfb-6-1')).toBeChecked();
    await expect(page.locator('#vfb-6-2')).toBeChecked();
  
    await page.uncheck('#vfb-6-0');
    await page.uncheck('#vfb-6-1');
    await page.uncheck('#vfb-6-2');
  
    await expect(page.locator('#vfb-6-0')).not.toBeChecked();
    await expect(page.locator('#vfb-6-1')).not.toBeChecked();
    await expect(page.locator('#vfb-6-2')).not.toBeChecked();
  });

/* Task 3
За допомогою Playwright реалізуйте наступний тестовий сценарій:
§ Перейдіть на веб-сайт https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select
§ Перейдіть до iframe із спадним меню
§ У спадному списку виберіть опцію "Saab"
§ Переконайтеся, що вибрано «Saab»
§ Натисніть кнопку Submit
§ Переконайтеся, що форма відпрацювала */

test("test3 - iframe on W3Schools site", async ({ page }) => {
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select');
  
    const frame = page.frameLocator('#iframeResult');
    await frame.locator('select').selectOption('saab');
    await expect(frame.locator('select')).toHaveValue('saab');

    await frame.locator('input[type="submit"]').click();
    await expect(frame.locator('body')).toContainText('cars=saab');
  });

/* Task 4.
За допомогою Playwright реалізуйте наступний тестовий сценарій: 
§ Перейдіть на веб-сайт http://formy-project.herokuapp.com/form
§ Заповніть текстове поле “First name” значенням “Sam”
§ Заповніть текстове поле “Last name” значенням “Robertson”
§ Заповніть текстове поле “Job title” значенням “Test Automation Engineer”
§ Для радіо-батона “Highest level of education” обрати значення “College”
§ Для чекбокса “Sex” обрати значення “Male”
§ Для випадаючого списку “Years of experience:” обрати значення “5-9”
§ Для поля “Date” ввести значення “14/12/2024”.
§ Натиснути кнопку Submit
§ Перевірити, що після відправлення форми з’являється повідомлення 'The form was successfully submitted!' */

test("task4 - submitting teh form on herokuapp", async ({ page }) => {
    await page.goto('http://formy-project.herokuapp.com/form');
  
    await page.locator('#first-name').fill('Sam');
    await page.locator('#last-name').fill('Robertson');
    await page.locator('#job-title').fill('Test Automation Engineer');
  
    await page.locator('#radio-button-2').check(); // College
    await page.locator('#checkbox-1').check(); // Male 
    await page.locator('select').selectOption({ label: '5-9' });
    await page.locator('#datepicker').fill('12/14/2024');
    await page.locator('.btn.btn-lg.btn-primary').click();
    await expect(page.locator('.alert')).toHaveText('The form was successfully submitted!');
  });

/* Task 5*.
За допомогою Playwright реалізуйте наступний тестовий сценарій: 
§ Перейдіть на веб-сайт інтернет-магазину https://ecommerce-playground.lambdatest.io/index.php?route=common/home
§ В секції “Top Trending Categories” оберіть категорію “Phones & PDAs”
§ Перевірте, що ви перейшли на сторінку “Phones & PDAs”
§ На стоорінці “Phones & PDAs” виконайте фільтрацію ціни від 135 до 165 $
§ Перевірте, що в результаті фільтрації було знайдено 8 товарів
§ Перевірте, що знайденим товаром є ”HTC Touch HD”
§ Додайте 1 товар ”HTC Touch HD” в корзину
§ Перевірте, що в корзині з’явився товар на загальну суму $146.00 */

test("Task 5 - validate successful purchase on ecommerce-playground.lambdatest", async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
    await page.getByRole('button', { name: 'Shop by Category' }).click();
    await page.getByRole('link', { name: 'Phone, Tablets & Ipod' }).click();
    await expect(page).toHaveURL(/.*category&path=57/);
    
    const filterSection = page.locator('#mz-filter-panel-0-0');
    await filterSection.scrollIntoViewIfNeeded();
    const minInput = filterSection.locator('input[name="mz_fp[min]"]');
    const maxInput = filterSection.locator('input[name="mz_fp[max]"]');
    await minInput.fill('135');
    await maxInput.fill('165');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');
  
    const products = page.locator('.product-thumb');
    const htcProduct = products.filter({hasText: 'HTC Touch HD'});
   
    await page.locator('#list-view').click();
    await page.locator('button.btn-cart.cart-28').click();
    await page.waitForTimeout(15000); 
    await page.locator('a.cart').first().click();
    
    const drawer = page.locator('#cart-total-drawer');
    await expect(drawer).toBeVisible();
    
    await expect(drawer.locator('a',{ hasText:'HTC Touch HD'})).toBeVisible();
    await expect(drawer.locator('table.table.mb-0 tr:last-child td.text-right')).toHaveText('$146.00');
  });

 