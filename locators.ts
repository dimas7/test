// Перечисления со статичными константами для хранения Локаторов в едином месте
// В идеале прописываем для нужных элементов data-test-id. А потом храним и используем их отсюда

/**
 * @summary Общие локаторы на большинстве типов страниц.
 */
export enum CommonLocators {
  /**
   * @description Ссылка-Лого в шапке
   */
  HEADER_LOGO_LINK = "header a.logo",
  /**
   * @description Ссылка-Лого в шапке
   */
  FOOTER_LOGO_LINK = "footer a",

  /**
   * @description Кнопка наши вакансии Desktop
   */
  BUTTON_VACANCIES_MENU = '.content button:has-text("Наши вакансии")',

  /**
   * @description Элементы вакансий(текстовые) в меню
   */
  VACANCIES_LINK_ITEMS = "a .vacancies-menu-item",
  VACANCIES_ITEM = ".vacancies-menu-item",
  VACANCIES_MENU = ".vacancies-menu",
  BUTTON_CLOSE_MENU = '.vacancies-menu button:has-text("Закрыть")',
  BLOCK_TEXT = '.block-text',
  BLOCK_HEADER = '.items-start',
  BLOCK_H2 = '.items-start h2',
  FIRST_BLOCK = '//section[contains(@class, "block-first")]',
  VIDEO = '#video',
}

export enum VacancyLocators {
  /**
   * @description Описание задачи
   */
  TASK_DESCRIPTION = '//h2/following-sibling::div/p[2]',
}
