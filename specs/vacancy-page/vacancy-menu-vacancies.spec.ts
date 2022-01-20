import { test, expect, Response } from "@playwright/test";
import { VacancyPage } from "../../pages/vacancy-page";
import listVacancies from "../../data/listVacancies.json";

test.describe('Страница вакансии Автоматизация тестирования. Меню "Еще вакансии" @menu', async () => {
  const vacancyPathname = 'auto-test';
  test("Открытие меню с вакансиями и закрытие с проверкой исчезновения", async ({ page }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });
    await test.step("Открытие меню с вакансиями", async () => {
      await vacancyPage.buttonMoreVacanciesMenu.click();
    });
    await test.step(
      "Проверка, что появились элементы меню(вакансии)",
      async () => {
        await expect(vacancyPage.vacanciesMenuContainer).toBeVisible();
        await expect(vacancyPage.vacanciesMenuItems.first()).toBeVisible();
        await expect(vacancyPage.vacanciesMenuItems.last()).toBeVisible();
        expect(await vacancyPage.vacanciesMenuItems.count()).toEqual(
          listVacancies.length
        );
      }
    );
    await test.step("Закрытие меню с вакансиями", async () => {
      await vacancyPage.buttonCloseMenu.click();
    });
    await test.step(
      "Проверка, что элементов меню теперь не видно",
      async () => {
        await expect(vacancyPage.vacanciesMenuContainer).toBeHidden();
        await expect(vacancyPage.vacanciesMenuItems.last()).toBeHidden();
      }
    );
  });

  test("Открытие меню вакансий и переход на вакансию Функциональное тестирование", async ({
    page,
    baseURL
  }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);
    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });
    await test.step('Открытие меню по кнопке "Наши вакансии"', async () => {
      await vacancyPage.buttonMoreVacanciesMenu.click();
    });
    await test.step('Нажимаем на вакансию "Функциональное тестирование" из появившегося меню', async () => {
      await vacancyPage.vacanciesMenuItemByHref(baseURL + '/manual-test').click();
    });

    await test.step('Проверка, что заголовок соответствует открываемой вакансии', async () => {
      await expect(vacancyPage.firstBlockHeader).toContainText("Инженер по функциональному тестированию");
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

  test('Открытие меню вакансий и переход на страницу "Другие вакансии"', async ({
    page, context
  }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);
    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });
    await vacancyPage.buttonMoreVacanciesMenu.click();

    const expectedURL =
      "https://yandex.ru/jobs/services/finances/?utm_source=finpromoland";
    const stepDesc = 'последний элемент в меню: "Другие вакансии"';
    await vacancyPage.clickAndCheckNewPageResponse(
      context,
      expectedURL,
      vacancyPage.vacanciesMenuItems.last(),
      stepDesc
    );
  });
});

