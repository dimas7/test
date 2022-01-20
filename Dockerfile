# Use Base Image playwright:focal for Tests
FROM mcr.microsoft.com/playwright:v1.17.2-focal
WORKDIR /tester

# === Install NPM packages ===
COPY ./package.json ./
RUN npm install
# === Install Playwright supported browsers ===
# Есть проблемы в образах от playwright, эта команда временно
RUN apt-get update
RUN npx playwright install chrome
RUN npx playwright install firefox
RUN npx playwright install webkit
COPY ./ /tester/

# === Print versions for bug reports
RUN echo "======VERSIONS======"
RUN npx playwright --version
RUN node --version
RUN google-chrome --version

CMD npm run test
