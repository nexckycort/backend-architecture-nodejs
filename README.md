# Backend Architecture Nodejs

| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-86.39%25-yellow.svg) | ![Branches](https://img.shields.io/badge/Coverage-90.32%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-77.27%25-red.svg) | ![Lines](https://img.shields.io/badge/Coverage-86.39%25-yellow.svg)    |

## The folder structure 🏢

```structure
├───src
│       app.ts          # App entry point
│   ├───api             # Express route controllers and middleware for all the endpoints of the app
│   ├───config          # Environment variables and configuration related stuff
│   ├───handlers        # Handlers
│   ├───helpers         # Helper methods
│   ├───interfaces      # interfaces
│   ├───jobs            # jobs
│   ├───loaders         # Split the startup process into modules
│   ├───models          # data access layer
│   └───services        # All the business logic is here
├───.editorconfig       # Editorconfig setup
├───.env                # Environment variables
├───.eslintignore       # To ignore some folder
├───.eslintrc           # Eslint setup
├───.huskyrc.json       # Husky setup
├───.lintstagedrc.json  # lint-staged setup
├───.nvmrc              # Version nodejs
├───.prettierrc         # Prettier setup
├───.jest.config.ts     # Jest setup
├───tsconfig.json       # TypeScript setup
└───webpack.config.ts   # Webpack setup
```

### Layer architecture

![layer architecture](https://user-images.githubusercontent.com/50475272/107291078-9759fc80-6a35-11eb-8c7a-c0ca3e9c71ac.png)

#### Raise the server, being at the root of the project

`npm run dev` for a development environment

`npm run build` prepare the project for a production environment

`npm start` for a production environment
