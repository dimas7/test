import { test, expect } from "@playwright/test";
import { VacancyLocators } from "../../locators";
import { VacancyPage } from "../../pages/vacancy-page";

test.describe('Отклик на вакансию "Автоматизация тестирования"', async () => {
  const vacancyPathname = 'auto-test';

  test('Проверка кнопки "Откликнуться"(скролл)', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'isIntersectingViewport не работает в Firefox');
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });
    await test.step('Нажимаем на кнопку "Откликнуться"', async () => {
      await vacancyPage.buttonRespondVacancy.click();
    });
    await test.step('Проверяем, что блок с задачей находится в ViewPort(скролл произвелся верно)', async () => {
      await vacancyPage.isIntersectingViewport(VacancyLocators.TASK_DESCRIPTION);
    });
  });

  // В идеале можно еще вынести общие шаги в VacancyPage и передавать в метод верный ответ, и параметризовать тесты для разных страниц
  test('Отправка Корректного ответа в задаче и редирект на телеграм', async ({ page }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });
    await test.step('Вводим верный ответ "Найти"', async () => {
      await vacancyPage.answerInput.fill("Найти");
    });
    await test.step('Нажимаем кнопку отправки', async () => {
      await vacancyPage.buttonSendAnswer.click();
    });
    await test.step('Проверяем, появление уведомления, об успешном ответе', async () => {
      await expect(vacancyPage.successAnswer).toBeVisible();
    });
    await test.step('Проверяем перенаправление в telegram', async () => {
      // На самом деле перенаправляет через 4-6 секунд, что является багом, можно передать параметр { timeout: 3000 }, чтобы проверять это тоже
      await page.waitForURL('https://t.me/YuliaLevina');
    });
  });

  // В идеале можно еще вынести общие шаги в VacancyPage и передавать в метод верный ответ, и параметризовать тесты для разных страниц
  test('Отправка Некорректного ответа в задаче и появление сообщения об этом', async ({ page, baseURL }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });
    await test.step('Вводим неверный ответ 12345', async () => {
      await vacancyPage.answerInput.fill("12345");
    });
    await test.step('Проверяем, отсутствие сообщения, о неверном ответе', async () => {
      await expect(vacancyPage.wrongAnswer).toBeHidden();
    });
    await test.step('Нажимаем кнопку отправки', async () => {
      await vacancyPage.buttonSendAnswer.click();
    });
    await test.step('Проверяем, появление сообщения, о неверном ответе', async () => {
      await expect(vacancyPage.wrongAnswer).toBeVisible();
    });
    await test.step('Проверяем исчезновение сообщения, о неверном ответе', async () => {
      await expect(vacancyPage.wrongAnswer).toBeHidden( { timeout: 7000 });
    });
    await test.step('Проверяем, что нас никуда не перенаправило', async () => {
      // Ждем 3 секунды
      await expect(vacancyPage.page).not.toHaveURL('https://t.me/YuliaLevina', { timeout: 3000 });
      await vacancyPage.shouldBeCorrectUrl(baseURL);
    });
  });

  test('Нажатие отправить с пустым ответом. Нет редиректов. Кнопка не нажимается.', async ({ page, baseURL }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });
    await test.step('Нажимаем кнопку отправки не вводя никаких данных', async () => {
      await vacancyPage.buttonSendAnswer.click({ force: true, noWaitAfter: true });
    });
    await test.step('Проверяем отсутствие сообщения об успешном ответе', async () => {
      await vacancyPage.page.waitForTimeout(2000);
      await expect(vacancyPage.successAnswer).toBeHidden();
    });
    await test.step('Проверяем, что нас никуда не перенаправило', async () => {
      await expect(vacancyPage.page).not.toHaveURL('https://t.me/YuliaLevina', { timeout: 6000 });
      await vacancyPage.shouldBeCorrectUrl(baseURL);
    });
  });
});
