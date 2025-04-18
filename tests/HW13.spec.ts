import { test, expect, request } from '@playwright/test';

/* Task 1.
За допомогою Playwright реалізуйте наступний сценарій API-тестування: 
§ Зробіть GET-запит на ендпойнт https://reqres.in/api/users/2
§ Переконайтеся, що запит успішний
§ Переконайтеся, що в тілі відповіді від сервера міститься об’єкт "data" з ключем "first_name" зі значенням "Janet"
§ Переконайтеся, що в тілі відповіді міститься об’єкт "data" з ключем "last_name" зі значенням "Weaver"
§ Переконайтеся, що в тілі відповіді міститься об’єкт "data" з ключем "email" зі значенням "janet.weaver@reqres.in" */

test('GET - validate user data', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.ok()).toBeTruthy();
  
    const body = await response.json();
  
    expect(body.data.first_name).toBe('Janet');
    expect(body.data.last_name).toBe('Weaver');
    expect(body.data.email).toBe('janet.weaver@reqres.in');
  });


/* Task 2.
За допомогою Playwright реалізуйте наступний сценарій API-тестування: 
§ Зробіть POST-запит на ендпойнт https://dummyjson.com/posts/add
§ Тіло запиту має містити дані для створення нового поста: поле title зі значенням "Awesome title" та поле userId зі значенням 10
§ Переконайтеся, що POST-запит успішний
§ Переконайтеся за допомогою відповіді від сервера, що створено новий пост, який має title зі значенням "Awesome title"
§ Переконайтеся за допомогою відповіді від сервера, що створено новий пост, який має userId зі значенням 10 */

test('POST - create new post', async ({ request }) => {
    const postData = {
      title: 'Awesome title',
      userId: 10,
    };
  
    const response = await request.post('https://dummyjson.com/posts/add', {
      data: postData,
    });
  
    expect(response.ok()).toBeTruthy();
  
    const body = await response.json();
  
    expect(body.title).toBe('Awesome title');
    expect(body.userId).toBe(10);
  });