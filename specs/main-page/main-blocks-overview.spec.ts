import { expect } from "@playwright/test";
import { test } from "../../fixtures/main-fixture";
import listVacancies from "../../data/listVacancies.json";

test.describe("Обзор элементов Главной страницы", async () => {

  test('Проверка видимости блоков содержащих текст и их количества', async ({ mainPage }) => {
    for (let index = 0; index < 4; index++) {
      await mainPage.blockText.nth(index).isVisible();
    }
  });

  test('Блок списка вакансий. Проверка видимости ссылок и соответствия списка вакансий', async ({ mainPage }) => {
    await expect(mainPage.linksVacancyInBlock.first()).toBeVisible();
    await expect(mainPage.linksVacancyInBlock.last()).toBeVisible();
    expect(await mainPage.linksVacancyInBlock.allTextContents()).toEqual(listVacancies);
  });

  test('Проверка видимости всех заголовков для блоков с инфой', async ({ mainPage }) => {
    for (let index = 0; index < 4; index++) {
      await mainPage.blockHeader2.nth(index).isVisible();
    }
  });
});
