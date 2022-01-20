# fintech-tests
Тестовое задание для покрытия страницы https://fintech.yandex.ru/ тестами Playwright

Для запуска проекта с тестами необходимо [установить Node.js с npm](https://nodejs.org/en/download/ )

# Install NPM packages

Находясь в директории корня проекта выполняем

`npm install`

# Install Playwright supported browsers

`npx playwright install`

# Конфигурация

Вся конфигурация тестов описана в playwright.config.ts

По умолчанию Playwright Test запускает `.*(test|spec)\.(js|ts|mjs)` files.

Например `titles.spec.ts`

Также в конфигурации указана testDir, в которой ищутся эти файлы.

# Запуск тестов

Для запуска тестов используется команда

`npx playwright test`

Запуск в Debug режимах ([подробнее](https://playwright.dev/docs/debug#run-in-debug-mode))

`PWDEBUG=1 npm run test` и `PWDEBUG=console npm run test`

Больше команд запуска и параметров в [документации](https://playwright.dev/docs/intro#command-line)

Без передачи параметра `BASEURL` он будет браться из `.env` файла.
Для запуска с передачей аргумента `BASEURL`(URL тестируемого сайта) используем команду:

```
BASEURL=https://playwright.dev npm run test
```

или

```
BASEURL=https://playwright.dev npx playwright test
```

---

Параметр `--retries=0` запускает тесты без повторов при падениях.

Параметр `-g @tag` запустит только тесты с @tag в названии.

Для запуск тестов из конкретной папки можно просто указать название папки, например, `npx playwright test vacancy-page` запустит все файлы с тестами из папки specs/vacancy-page

# Запуск в контейнере

Собираем образ

```
docker build -f Dockerfile -t ui_tests .
```

Запуск тестов в контейнере и проброс папок с результатами. Лучше перед запуском почистить результаты (`npm run clean`).
```
docker run --name ui_tests -v $(pwd)/allure-results:/tester/allure-results -v $(pwd)/playwright-report:/tester/playwright-report -v $(pwd)/test-results:/tester/test-results --rm ui_tests
```

Запускаем контейнер в интерактивном режиме

```
docker run -it --name ui_tests -v $(pwd)/allure-results:/tester/allure-results -v $(pwd)/playwright-report:/tester/playwright-report -v $(pwd)/test-results:/tester/test-results --rm ui_tests
```

тоже самое через быструю команду: `npm run docker-run`

# Отчеты

Allure предварительно должен быть установлен, например команда для macOS

`brew install allure`

Для генерации отчетов allure после тестов выполняем из директории корня проекта команду.

`allure serve`

Подробнее о других способах установки allure на [офф.сайт](https://docs.qameta.io/allure/#_installing_a_commandline)
