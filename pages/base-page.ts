import test, {
  BrowserContext,
  expect,
  Locator,
  Page,
  Response,
} from "@playwright/test";
import { CommonLocators } from "../locators";

/**
 * @summary Базовый класс паттерна PageObject.
 * @description Упрощает работы со страницами,
 * предоставляя общие переиспользуемые действия над страницей и проверки.
 * Хранит pathname страницы, заголовок и объект page(из playwright) для управления страницей.
 */
export abstract class BasePage {
  readonly page: Page;
  abstract readonly PATHNAME: string;
  readonly expectedTitle: string | RegExp;

  // Common Locators
  /**
   * @summary Ссылка-Лого в шапке
   */
  readonly headerLogoLink: Locator;
  /**
   * @summary Ссылка-Лого в шапке
   */
  readonly footerQuestionsLink: Locator;
  /**
   * @summary Элементы вакансий(текстовые) в меню
   */
  readonly vacanciesMenuItems: Locator;
  readonly vacanciesMenuContainer: Locator;
  /**
   * @summary кнопка закрытия меню с вакансиями
   */
  readonly buttonCloseMenu: Locator;

  /**
   * @summary Первый блок c основной инфой
   */
  readonly firstBlock: Locator;
  /**
   * @summary Заголовок первого блока
   */
  readonly firstBlockHeader: Locator;

  /**
   * @summary Блоки с текстом
   */
  readonly blockText: Locator;

  // В ближайших версиях Playwright будут фильтры и таких извращений не придется делать насколько понимаю.
  /**
   * @summary Возвращает локатор - ссылку на вакансию в Основном блоке
   * @param href url нужной вакансии, по которому происходит поиск
   */
  vacanciesMenuItemByHref(href: string): Locator {
    return this.vacanciesMenuContainer
      .locator(`a[href="${href}"]`)
      .locator(CommonLocators.VACANCIES_ITEM);
  }

  constructor(page: Page) {
    this.page = page;
    this.expectedTitle = "Создавайте Финтех с нуля";
    this.headerLogoLink = page.locator(CommonLocators.HEADER_LOGO_LINK);
    this.footerQuestionsLink = page.locator(CommonLocators.FOOTER_LOGO_LINK);

    this.vacanciesMenuContainer = this.locator(CommonLocators.VACANCIES_MENU);
    this.vacanciesMenuItems = this.vacanciesMenuContainer.locator(
      CommonLocators.VACANCIES_LINK_ITEMS
    );
    this.buttonCloseMenu = this.locator(CommonLocators.BUTTON_CLOSE_MENU);
    this.firstBlock = this.locator(CommonLocators.FIRST_BLOCK);
    this.firstBlockHeader = this.firstBlock.locator("h1");
    this.blockText = this.locator(CommonLocators.BLOCK_TEXT);
  }

  /**
   * @summary Переход на страницу данного класса.
   * @description URL составляется из baseURL(playwright.config.ts) + PATHNAME(из текущего класса)
   */
  async goto(options?: {
    waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
    timeout?: number;
  }): Promise<void> {
    await this.page.goto(this.PATHNAME, options);
  }

  /**
   * @summary Метод page.locator из Playwright. Обертка для сокращения кода
   * @description
   * The method returns an element locator that can be used to perform actions on the page. Locator is resolved to the
   * element immediately before performing an action, so a series of actions on the same locator can in fact be performed on
   * different DOM elements. That would happen if the DOM structure between those actions has changed.
   *
   * Note that locator always implies visibility, so it will always be locating visible elements.
   *
   * Shortcut for main frame's [frame.locator(selector)](https://playwright.dev/docs/api/class-frame#frame-locator).
   * @param selector A selector to use when resolving DOM element. See [working with selectors](https://playwright.dev/docs/selectors) for more details.
   */
  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * @summary Проверка на соответствие открытого URL с URL данной страницы.
   * Ожидает некоторое время(дефолтное), чтобы URL совпал и страница загрузилась.
   * @param baseURL значение baseURL, можно получить из теста. Хранится в playwright.config.ts
   */
  async shouldBeCorrectUrl(baseURL: string): Promise<void> {
    const expectedURL = new URL(this.PATHNAME, baseURL).href;
    await this.page.waitForURL(expectedURL, { timeout: 15, waitUntil: "domcontentloaded" });
  }

  /**
   * @summary Нажатие на логотип в шапке и проверка открытия новой вкладки с вакансиями.
   * Проверяется открытый url и HTTP ответ сервера.
   * @param context объект текущего браузерного контекста
   */
  async clickLogoAndCheckPageResponse(context: BrowserContext): Promise<void> {
    const expectedURL =
      "https://yandex.ru/jobs/services/finances/?utm_source=finpromoland";
    const stepDesc = 'логотип "Яндекс" в шапке';
    await this.clickAndCheckNewPageResponse(context, expectedURL, this.headerLogoLink, stepDesc);
  }
  /**
   * @summary Нажатие на ссылку для вопросов в подвале страницы и проверка открытия новой вкладки с формой.
   * Проверяется открытый в новой вкладке url и HTTP ответ сервера.
   * @param context объект текущего браузерного контекста
   */
   async clickFooterQuestionAndCheckPageResponse(
    context: BrowserContext
  ): Promise<void> {
    const expectedURL =
      "https://forms.yandex.ru/surveys/10033130.5b4b1762a8b370cdbbc12efd40b9527298c8f28e/";
    const stepDesc = 'ссылку для вопросов в подвале страницы';
    await this.clickAndCheckNewPageResponse(context, expectedURL, this.footerQuestionsLink, stepDesc);
  }

  /**
   * @summary Нажатие на переданный локатор и проверка открытия новой вкладки.
   * Проверяется открытый в новой вкладке url и HTTP ответ сервера.
   * @param context объект текущего браузерного контекста
   * @param locator элемент на который нажимаем
   * @param stepDescription Описание куда нажимаем, которое будет выведено в шаге.
   */
  async clickAndCheckNewPageResponse(
    context: BrowserContext,
    expectedURL: string,
    locator: Locator,
    stepDescription: string,
  ): Promise<void> {
    let newPage: Page;
    let responseForExpectedUrl: Response;
    await test.step("Нажатие на " + stepDescription, async () => {
      [newPage, responseForExpectedUrl] = await Promise.all([
        context.waitForEvent("page"),
        context.waitForEvent(
          "response",
          (response) => response.url() === expectedURL
        ),
        locator.click(),
      ]);
    });

    await test.step(
      `Проверка, что открылся верный URL=${expectedURL} в новой вкладке`,
      async () => {
        await expect(newPage).toHaveURL(expectedURL);
      }
    );

    await test.step(
      "Проверка, что в новой вкладке ответ HTTP был с кодом 200-299",
      async () => {
        expect(responseForExpectedUrl.ok()).toEqual(true);
      }
    );
  }

  /**
   * @summary Проверка на соответствие заголовка текущей страницы.
   * @throws в случае не совпадения заголовка
   */
  async shouldHaveCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(this.expectedTitle);
  }

  /**
   * @returns {!Promise<boolean>}
   * @summary Проверка, что нужный элемент находится в текущей области видимости(viewPort)
   */
  isIntersectingViewport(selector: string): Promise<boolean> {
    return this.page.$eval(selector, async (element) => {
      const visibleRatio: number = await new Promise((resolve) => {
        const observer = new IntersectionObserver((entries) => {
          resolve(entries[0].intersectionRatio);
          observer.disconnect();
        });
        observer.observe(element);
        // Firefox doesn't call IntersectionObserver callback unless
        // there are rafs.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        requestAnimationFrame(() => {});
      });
      return visibleRatio > 0;
    });
  }
}
