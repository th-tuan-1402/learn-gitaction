# Nuxt Project with CI/CD and Unit Testing Setup

This project is a Nuxt.js application that uses GitHub Actions for CI/CD and includes unit testing setup. The project follows a series of steps for setting up the project environment, creating a simple page, configuring unit tests, and automating test runs on each commit.

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) installed
- GitHub repository for hosting and GitHub Actions setup

## Steps

### 1. Initialize the Nuxt Project

The project was initialized following the instructions from the [Nuxt documentation](https://nuxt.com/docs/api/commands/init). Basic setup commands:

```bash
npx nuxi init nuxt-app
cd nuxt-app
npm install
```

### 2. Set Up CI/CD with GitHub Actions

We created a `.github/workflows/ci.yml` file to automate the build and test process for each commit:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Run build
        run: npm run build

      - name: Run tests
        run: npm run test
```

### 3. Create a Simple Page Component

We created a simple page component (`pages/hello.vue`) with basic content for testing:

```html
<template>
  <div>
    <h1>Hello, Nuxt.js!</h1>
    <p>This is a simple test page.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloPage',
};
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
```

### 4. Set Up Unit Testing

We installed `Vitest` for unit testing and configured it in `vite.config.ts` as follows:

```bash
npm install --save-dev vitest @vitejs/plugin-vue
```

Updated `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
```

### 5. Create a Unit Test for the Page Component

A simple unit test was created for the `HelloPage` component in `tests/pages/hello.spec.js`:

```javascript
import { mount } from '@vue/test-utils';
import HelloPage from '../../pages/hello.vue';

describe('HelloPage', () => {
  it('renders correctly', () => {
    const wrapper = mount(HelloPage);
    expect(wrapper.text()).toContain('Hello, Nuxt.js!');
  });
});
```

### 6. Configure GitHub Actions to Run Tests

We updated the GitHub Actions configuration to run tests as part of the CI pipeline (in `.github/workflows/ci.yml`):

```yaml
- name: Run tests
  run: npm run test
```

### 7. Fix Dependency Conflicts

During setup, a few dependency conflicts were resolved:

- **Vite Plugin Configuration**: Installed `@vitejs/plugin-vue` to handle `.vue` files.
- **Jest Configuration (Optional)**: Configured Jest with `vue-jest` and `babel-jest` if Jest is used instead of Vitest.

### Known Issues and Troubleshooting

- **Error: `describe` is not defined**: This was fixed by setting `globals: true` in the Vitest configuration within `vite.config.ts`.
- **Failed to parse `.vue` files**: Solved by installing `@vitejs/plugin-vue` and configuring it in `vite.config.ts`.

## Usage

To start the development server:

```bash
npm run dev
```

To run unit tests:

```bash
npm run test
```

To trigger the CI/CD pipeline, push changes to the `main` branch or open a pull request targeting the `main` branch.

## Conclusion

This project demonstrates the setup of a basic Nuxt.js project with GitHub Actions for CI/CD and automated unit testing with Vitest. The pipeline is configured to build the project and run tests on each commit, ensuring code quality and functionality.

### Lưu ý
File `README.md` này bao gồm các bước từ việc khởi tạo dự án, cấu hình CI/CD, thiết lập unit test, đến cách xử lý một số lỗi đã gặp.