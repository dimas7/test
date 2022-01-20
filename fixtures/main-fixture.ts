import { test as base } from '@playwright/test';
import { MainPage } from '../pages/main-page';

export const test = base.extend<{mainPage: MainPage}>({
  mainPage: async ({ page, baseURL }, use) => {
    const mainPage = new MainPage(page);

    await test.step("Открытие главной страницы", async () => {
      await mainPage.page.goto(baseURL);
    });
    await use(mainPage);
  },
});
