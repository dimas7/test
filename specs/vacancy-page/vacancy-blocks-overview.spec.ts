import { test, expect } from "@playwright/test";
import { VacancyPage } from "../../pages/vacancy-page";

test.describe('Страница вакансии "Автоматизация тестирования". Обзор элементов', async () => {
  const vacancyPathname = 'auto-test';

  test('Открытие вакансии по URL. Проверка видимости элементов', async ({ page }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
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

  test('Открытие вакансии по URL. Скролл к блоку в середине, проверка нахождения блока в ViewPort', async ({ page }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });
    await test.step('Скроллим ко 2-ому блоку с текстом', async () => {
      await vacancyPage.blockText.nth(1).scrollIntoViewIfNeeded();
    });
  });
});
