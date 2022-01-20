import { expect } from "@playwright/test";
import { test } from "../../fixtures/main-fixture";
import { VacancyPage } from "../../pages/vacancy-page";

test.describe("Список вакансий в блоке @list-vacancies", async () => {

  test('Переход на страницу вакансии "Автоматизация тестирования" из списка вакансий', async ({ mainPage, baseURL }) => {
    const vacancyPathname = baseURL + '/auto-test';
    await mainPage.linkVacancyInBlockByHref(vacancyPathname).click();
    const vacancyPage = new VacancyPage(mainPage.page);

    await test.step('Проверка, что открылась нужная страница (верный заголовок)', async () => {
      await expect(vacancyPage.firstBlockHeader).toContainText("Инженер по автоматизации тестирования");
      await expect(vacancyPage.firstBlockHeader).toBeVisible();
    });

    await test.step('Проверка видимости Заголовков для блоков с основной инфой', async () => {
      await vacancyPage.shouldBeVisibleBlockHeaders();
    });
    await test.step('Проверка видимости блоков с текстом', async () => {
      await vacancyPage.shouldBeVisibleTextBlocks();
    });
    await test.step('Проверка видимости Описания к задаче', async () => {
      await expect(vacancyPage.taskDescription).toBeVisible();
    });
    await test.step('Проверка видимости Условия/кода задачи', async () => {
      await expect(vacancyPage.taskCodeCondition).toBeVisible();
    });
  });

  test('Переход на вакансию Функциональное тестирование из блока со списком вакансий', async (
    { mainPage, baseURL }) => {
    await test.step('Нажимаем на вакансию "Функциональное тестирование" из появившегося меню', async () => {
      await mainPage.linkVacancyInBlockByHref(baseURL + '/manual-test').click();
    });
    const vacancyPage = new VacancyPage(mainPage.page);
    await test.step('Проверка, что URL поменялся', async () => {
      await vacancyPage.page.waitForURL('**://**\/**');
    });
    await test.step('Проверка, что Заголовок с названием вакансии видимый', async () => {
      expect((await vacancyPage.firstBlockHeader.textContent()).length).toBeGreaterThanOrEqual(10);
      await expect(vacancyPage.firstBlockHeader).toBeVisible();
    });

    await test.step('Проверка видимости Заголовков для блоков с основной инфой', async () => {
      await vacancyPage.shouldBeVisibleBlockHeaders();
    });
    await test.step('Проверка видимости блоков с текстом', async () => {
      await vacancyPage.shouldBeVisibleTextBlocks();
    });
    await test.step('Проверка видимости Описания к задаче', async () => {
      await expect(vacancyPage.taskDescription).toBeVisible();
    });
    await test.step('Проверка видимости Условия/кода задачи', async () => {
      await expect(vacancyPage.taskCondition).toBeVisible();
    });
  });

  test('Переход по ссылке "Другие вакансии" из блока со списком вакансий', async (
    { mainPage, context }) => {
    const expectedURL =
      "https://yandex.ru/jobs/services/finances/?utm_source=finpromoland";
    const stepDesc = 'последнюю ссылку в блоке со списком вакансий';
    await mainPage.clickAndCheckNewPageResponse(context, expectedURL, mainPage.linkAnotherVacancies, stepDesc);
  });

});
