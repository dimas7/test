import { test } from "@playwright/test";
import { VacancyPage } from "../../pages/vacancy-page";
import { MainPage } from "../../pages/main-page";

test.describe.parallel("Подвал и шапка страницы вакансии Автоматизация тестирования", async () => {
  const vacancyPathname = '/auto-test'
  test("Переход по лого в шапке на основной сайт Яндекс с вакансиями в новой вкладке", async ({
    page,
    context,
    baseURL,
  }) => {
    const vacancyURL = baseURL + vacancyPathname;
    const mainPage = new MainPage(page);

    await test.step("Открытие главной страницы", async () => {
      await mainPage.goto({ waitUntil: "domcontentloaded" });
    });
    await test.step('Открытие меню по кнопке "Наши вакансии"', async () => {
      await mainPage.buttonVacanciesMenu.click();
    });
    await test.step("Нажимаем на нужную вакансию в появившемся меню",async () => {
      await mainPage.vacanciesMenuItemByHref(vacancyURL).click();
    });
    const vacancyPage = new VacancyPage(mainPage.page, vacancyURL);
    await vacancyPage.clickLogoAndCheckPageResponse(context);
  });

  test("Переход на форму для Вопросов в подвале в новой вкладке", async ({
    page,
    context,
    baseURL
  }) => {
    const vacancyURL = baseURL + vacancyPathname;
    const mainPage = new MainPage(page);

    await test.step("Открытие главной страницы", async () => {
      await mainPage.goto({ waitUntil: "domcontentloaded" });
    });
    await test.step('Открытие меню по кнопке "Наши вакансии"', async () => {
      await mainPage.buttonVacanciesMenu.click();
    });
    await test.step("Нажимаем на нужную вакансию в появившемся меню",async () => {
      await mainPage.vacanciesMenuItemByHref(vacancyURL).click();
    });
    const vacancyPage = new VacancyPage(mainPage.page);
    await vacancyPage.clickFooterQuestionAndCheckPageResponse(context);
  });

  test('Переход по кнопке "На главную"', async ({ page, baseURL }) => {
    const vacancyURL = baseURL + vacancyPathname;
    const mainPage = new MainPage(page);

    await test.step("Открытие главной страницы", async () => {
      await mainPage.goto({ waitUntil: "domcontentloaded" });
    });
    await test.step('Открытие меню по кнопке "Наши вакансии"', async () => {
      await mainPage.buttonVacanciesMenu.click();
    });
    await test.step("Нажимаем на нужную вакансию в появившемся меню",async () => {
      await mainPage.vacanciesMenuItemByHref(vacancyURL).click();
    });
    const vacancyPage = new VacancyPage(mainPage.page, vacancyURL);
    await vacancyPage.buttonGoToMain.click();
    await mainPage.shouldBeCorrectUrl(baseURL);
  });
});
