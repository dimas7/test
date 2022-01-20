import { test } from "@playwright/test";
import { MainPage } from "../../pages/main-page";

test.describe.parallel("Подвал и шапка Главной страницы.", async () => {
  test("Переход по лого в шапке на основной сайт Яндекс с вакансиями в новой вкладке", async ({
    page,
    context,
  }) => {
    const mainPage = new MainPage(page);

    await test.step("Открытие главной страницы", async () => {
      await mainPage.goto({ waitUntil: "domcontentloaded" });
    });

    await mainPage.clickLogoAndCheckPageResponse(context);
  });

  test("Переход на форму для Вопросов в подвале в новой вкладке", async ({
    page,
    context,
  }) => {
    const mainPage = new MainPage(page);

    await test.step("Открытие главной страницы", async () => {
      await mainPage.goto({ waitUntil: "domcontentloaded" });
    });

    await mainPage.clickFooterQuestionAndCheckPageResponse(context);
  });
});
