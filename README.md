# My Vue.js Project with CI/CD Setup

This project demonstrates a basic Vue.js application with a CI/CD pipeline setup using GitHub Actions. The pipeline includes steps to install dependencies, build the project, and deploy it to GitHub Pages.

## Project Setup

### Step 1: Create a Vue.js Project

To create a new Vue.js project, you need to have Node.js and Vue CLI installed.

1. Install Vue CLI (if not already installed):

   ```bash
   npm install -g @vue/cli
   ```

2. Create a new Vue project:

   ```bash
   vue create my-vue-project
   ```

3. Navigate to the project directory:

   ```bash
   cd my-vue-project
   ```

### Step 2: Set Up GitHub Actions for CI/CD

To enable CI/CD for this project, we'll use GitHub Actions to automate testing and deployment.

1. Create the `.github/workflows` directory if it does not exist:

   ```bash
   mkdir -p .github/workflows
   ```

2. Create a new file `ci-cd.yml` in `.github/workflows` with the following content:

   ```yaml
   name: CI/CD for Vue.js

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
         - name: Checkout repository
           uses: actions/checkout@v3

         - name: Set up Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18' # Specify Node.js version as needed

         - name: Install dependencies
           run: npm install

         - name: Build project
           run: npm run build

         - name: Upload artifact
           uses: actions/upload-artifact@v3
           with:
             name: build
             path: dist/ # Ensure this matches the Vue.js build output

     deploy:
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Download artifact
           uses: actions/download-artifact@v3
           with:
             name: build
             path: output

         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./output
   ```

### Step 3: Configure `GITHUB_TOKEN` and Custom Secrets

GitHub provides a `GITHUB_TOKEN` secret by default for each GitHub Actions workflow, which allows it to interact with the repository securely.

1. The `GITHUB_TOKEN` is used here to authorize deployments to GitHub Pages.
2. If additional secrets are needed (e.g., for external API keys), they can be added:
   - Go to **Settings** > **Secrets and variables** > **Actions** in the repository.
   - Click **New repository secret** and add the name and value of your secret.
   
   For example:
   
   - **Name**: `API_KEY`
   - **Value**: `your-api-key-value`

   Use `${{ secrets.API_KEY }}` to access this secret in your workflow.

### Step 4: Commit and Push to Trigger the Workflow

After configuring the CI/CD file, commit and push changes to the repository:

```bash
git add .
git commit -m "Add CI/CD configuration with GitHub Actions"
git push origin main
```

This will automatically trigger the GitHub Actions workflow, which will:
- Install dependencies
- Build the project
- Upload the build artifact
- Deploy to GitHub Pages

### Workflow Details

The workflow is divided into two main jobs:

1. **Build Job**:
   - Installs dependencies
   - Builds the Vue.js project
   - Uploads the build artifact to GitHub Actions for use in later steps

2. **Deploy Job**:
   - Downloads the build artifact
   - Deploys the built files to GitHub Pages using `peaceiris/actions-gh-pages`

### Troubleshooting

- **Artifact Not Found**: Ensure that the `path` in `upload-artifact` points to the correct build directory (usually `dist` for Vue.js).
- **No Deployment**: Ensure `GITHUB_TOKEN` is set with the correct permissions in **Settings** > **Actions** > **General** > **Workflow permissions**.

## License

This project is licensed under the MIT License.
```

Hãy thay thế `"your-api-key-value"` bằng giá trị thực tế của bạn nếu cần. File README này cung cấp các hướng dẫn từ việc tạo project Vue.js đến thiết lập CI/CD với GitHub Actions, giúp người dùng dễ dàng triển khai code lên GitHub Pages.