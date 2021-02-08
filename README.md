# Backend Architecture Nodejs

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
│   ├───models          # Database models
│   └───services        # All the business logic is here
├───webpack             # Webpack setup
├───.editorconfig       # ...
├───.env                # Environment variables
├───.eslintignore       # ...
├───.eslintrc           # ...
├───.huskyrc.json       # ...
├───.lintstagedrc.json  # ...
├───.nvmrc              # ...
├───.prettierrc         # ...
├───.jest.config.js     # Jest setup
└───tsconfig.json       # TypeScript setup
```

### Layer architecture

![layer architecture](https://user-images.githubusercontent.com/50475272/107291078-9759fc80-6a35-11eb-8c7a-c0ca3e9c71ac.png)

#### Raise the server, being at the root of the project

`npm run dev` for a development environment

`npm run build` prepare the project for a production environment

`npm start` for a production environment
