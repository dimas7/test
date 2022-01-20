import { BasePage } from './base-page';
import { CommonLocators } from '../locators';
import { Locator, Page } from '@playwright/test';

export class MainPage extends BasePage {
  readonly PATHNAME: string = '';
  /**
   * @summary Кнопка вызова меню с вакансиями
   */
  readonly buttonVacanciesMenu: Locator;
  /**
   * @summary Кнопка включения/выключения звука
   */
  readonly buttonMute: Locator;
  /**
   * @summary Заголовки Основных блоков с инфой. "что ждет", "что предлагаем"
   */
  readonly blockHeader2: Locator;
  /**
   * @summary Основные блоки Главной страницы с инфой
   */
  readonly block: Locator;

  /**
   * @summary Элемент вакансии в блоке
   */
  readonly linksVacancyInBlock: Locator;
  readonly linkAnotherVacancies: Locator;

  // В ближайших версиях Playwright будут фильтры и таких извращений не придется делать насколько понимаю.
  /**
   * @summary Возвращает локатор - ссылку на вакансию в Основном блоке
   * @param href url нужной вакансии, по которому происходит поиск
   */
  linkVacancyInBlockByHref(href: string): Locator{
    return this.locator('.home-block').locator(`a[href="${href}"]`).locator(CommonLocators.VACANCIES_ITEM);
  }

  constructor(page: Page) {
    super(page);
    this.buttonVacanciesMenu = this.locator(CommonLocators.BUTTON_VACANCIES_MENU);
    this.buttonMute = this.buttonVacanciesMenu.locator('..').locator('//following-sibling::button');
    this.block = this.locator('.home-block');
    this.blockHeader2 = this.block.locator(CommonLocators.BLOCK_H2);

    this.linksVacancyInBlock = this.locator('.home-block').locator(CommonLocators.VACANCIES_LINK_ITEMS);
    this.linkAnotherVacancies = this.locator('.home-block').locator(`a :not(${CommonLocators.VACANCIES_ITEM})`);
  }
}
