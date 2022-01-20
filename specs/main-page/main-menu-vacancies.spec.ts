import { expect } from "@playwright/test";
import listVacancies from "../../data/listVacancies.json";
import { test } from "../../fixtures/main-fixture";
import { VacancyPage } from "../../pages/vacancy-page";

test.describe("Меню с вакансиями @menu", async () => {
  test("Открытие меню с вакансиями и закрытие. Проверка, что меню исчезло", async ({
    mainPage,
  }) => {
    await test.step("Открытие меню с вакансиями", async () => {
      await mainPage.buttonVacanciesMenu.click();
    });
    await test.step("Проверка, что появились элементы меню(вакансии)", async () => {
      await expect(mainPage.vacanciesMenuContainer).toBeVisible();
      await expect(mainPage.vacanciesMenuItems.first()).toBeVisible();
      await expect(mainPage.vacanciesMenuItems.last()).toBeVisible();
      // +1 т.к. есть еще "Другие вакансии"
      expect(await mainPage.vacanciesMenuItems.count()).toEqual(
        listVacancies.length + 1
      );
    });
    await test.step("Закрытие меню с вакансиями", async () => {
      await mainPage.buttonCloseMenu.click();
    });
    await test.step(
      "Проверка, что элементов меню теперь не видно",
      async () => {
        await expect(mainPage.vacanciesMenuContainer).toBeHidden();
        await expect(mainPage.vacanciesMenuItems.last()).toBeHidden();
      }
    );
  });

  test('Открытие меню вакансий и переход на страницу вакансии "Автоматизация тестирования"', async ({
    mainPage,
    baseURL,
  }) => {
    const vacancyPathname = "/auto-test";
    const vacancyURL = baseURL + vacancyPathname;
    await test.step('Открытие меню по кнопке "Наши вакансии"', async () => {
      await mainPage.buttonVacanciesMenu.click();
    });
    await test.step("Нажимаем на нужную вакансию в появившемся меню", async () => {
      await mainPage.vacanciesMenuItemByHref(vacancyURL).click();
    });
    const vacancyPage = new VacancyPage(mainPage.page, vacancyPathname);

    await test.step("Проверка видимости Заголовков для блоков с основной инфой", async () => {
      await vacancyPage.shouldBeVisibleBlockHeaders();
    });
    await test.step("Проверка видимости блоков с текстом", async () => {
      await vacancyPage.shouldBeVisibleTextBlocks();
    });
    await test.step("Проверка видимости Описания к задаче", async () => {
      await expect(vacancyPage.taskDescription).toBeVisible();
    });
    await test.step("Проверка видимости Условия/кода задачи", async () => {
      await expect(vacancyPage.taskCodeCondition).toBeVisible();
    });
  });

  test("Открытие меню вакансий и переход на вакансию Функциональное тестирование", async ({
    mainPage,
    baseURL
  }) => {
    await test.step('Открытие меню по кнопке "Наши вакансии"', async () => {
      await mainPage.buttonVacanciesMenu.click();
    });
    const vacancyURL = baseURL + '/manual-test';
    const vacancyPage = new VacancyPage(mainPage.page);
    await test.step('Нажимаем на вакансию "Функциональное тестирование" из появившегося меню', async () => {
      await vacancyPage.vacanciesMenuItemByHref(vacancyURL).click();
    });

    await test.step("Проверка видимости Заголовков для блоков с основной инфой", async () => {
      await vacancyPage.shouldBeVisibleBlockHeaders();
    });
    await test.step("Проверка видимости блоков с текстом", async () => {
      await vacancyPage.shouldBeVisibleTextBlocks();
    });
    await test.step("Проверка видимости Описания к задаче", async () => {
      await expect(vacancyPage.taskDescription).toBeVisible();
    });
    await test.step("Проверка видимости Условия/кода задачи", async () => {
      await expect(vacancyPage.taskCondition).toBeVisible();
    });
  });

  test('Открытие меню вакансий и переход по последней ссылке "Другие вакансии"', async ({
    mainPage,
    context,
  }) => {
    await mainPage.buttonVacanciesMenu.click();

    const expectedURL =
      "https://yandex.ru/jobs/services/finances/?utm_source=finpromoland";
    const stepDesc = 'последний элемент в меню: "Другие вакансии"';
    await mainPage.clickAndCheckNewPageResponse(
      context,
      expectedURL,
      mainPage.vacanciesMenuItems.last(),
      stepDesc
    );
  });
});
