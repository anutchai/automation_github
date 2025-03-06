// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

var user_id;

// การทดสอบ API แบบ Get
test('Get Users ', async ({ request }) => {
  // การส่ง API แบบ get และเก็บใส่ตัวแปร response
  const response = await request.get('https://reqres.in/api/users?page=2')
  const resBody = await response.json();
  // console.log(resBody);
  // การยืนยันหรือ Assertion
  expect(response.status()).toBe(200)
});

// การทดสอบ API แบบ Post
test('Login ', async ({ request }) => {

  const response = await request.post('https://reqres.in/api/login', {
    data: { "email": "eve.holt@reqres.in", "password": "cityslicka" },
    headers: { "Accept": "application/json" }
  })
  expect(response.status()).toBe(200)

  var res = await response.json()
  var token_key = res.token

  console.log(token_key);
});

// การทดสอบ API Method Post
test('Create Users CI/CD', async ({ request }) => {
  // การส่ง API แบบ post และเก็บใส่ตัวแปร response
  const response = await request.post('https://reqres.in/api/users',
    {
      data: { "name": "morpheus", "job": "leader" },
      headers: { "Accept": "application/json" }
    });
  expect(response.status()).toBe(201)
  // การเก็บค่า ID User ที่เพิ่งสร้างขึ้น
  var res = await response.json()
  user_id = res.id
});

// การทดสอบ API Method Put
test('Update User', async ({ request }) => {
  // การส่ง API แบบ put และเก็บใส่ตัวแปร response
  const response = await request.put('https://reqres.in/api/users/2',
    {
      data: { "name": "anutchai", "job": "teacher" },
      headers: { "Accept": "application/json" }
    });
  expect(response.status()).toBe(200)
});

// การทดสอบ API Method Delete
test('Delete Users', async ({ request }) => {
  // การส่ง API แบบ delete และเก็บใส่ตัวแปร response
  const response = await request.delete('https://reqres.in/api/users/2');
  expect(response.status()).toBe(204)
});