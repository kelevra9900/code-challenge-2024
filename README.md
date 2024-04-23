# 🚀 Code Challenge MERN

[![Build Express Application](https://github.com/edwinhern/express-typescript-2024/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/build.yml)
[![CodeQL](https://github.com/edwinhern/express-typescript-2024/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/codeql.yml)
[![Docker Image CI](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml/badge.svg?branch=master)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml)
[![Release](https://github.com/edwinhern/express-typescript-2024/actions/workflows/release.yml/badge.svg?branch=master)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/release.yml)

## 🌟 Introduction

Welcome to this code challenge! This repository contains a test project for a MERN stack application. The project is built with TypeScript, Express, and MongoDB, and is designed to showcase a full-stack application with a RESTful API.

## Screenshots

| Home | Home 2 | Home 3 | Home 4 |
|-----------|----------------|----------------|----------------|
| ![Preview](https://firebasestorage.googleapis.com/v0/b/portafolio-rt.appspot.com/o/previews%2Fimage-1.png?alt=media&token=22652e74-0586-47bd-acce-c871717546c7) | ![HOME 2](https://firebasestorage.googleapis.com/v0/b/portafolio-rt.appspot.com/o/previews%2Fimage-2.png?alt=media&token=92d9c3d3-9d10-4421-a783-409f55b0169e)| ![Home 4](https://firebasestorage.googleapis.com/v0/b/portafolio-rt.appspot.com/o/previews%2Fimage-3.png?alt=media&token=8acf505b-ef05-4c6d-bd3e-9c880f3b6cee)| ![Onboarding](https://firebasestorage.googleapis.com/v0/b/portafolio-rt.appspot.com/o/previews%2Fimage-4.png?alt=media&token=e5fcb2a0-7646-420b-a2ab-54f3591ff59b) |


| Auth 5 | Dashboard 6 | API 7 | API 8 |
|-----------|----------------|----------------|----------------|
| ![Preview](https://firebasestorage.googleapis.com/v0/b/portafolio-rt.appspot.com/o/previews%2Fimage-5.png?alt=media&token=98337b02-5598-402c-a2ad-458d0b5be866) | ![HOME 2](https://firebasestorage.googleapis.com/v0/b/portafolio-rt.appspot.com/o/previews%2Fimage-6.png?alt=media&token=79397684-7ec9-483a-8a14-92760e994d76)| ![Home 4](https://firebasestorage.googleapis.com/v0/b/portafolio-rt.appspot.com/o/previews%2Fimage-7.png?alt=media&token=548a2b45-8366-411e-b0d2-4ec68b275e5d)| ![Onboarding](https://firebasestorage.googleapis.com/v0/b/portafolio-rt.appspot.com/o/previews%2Fimage-8.png?alt=media&token=89dfeeb7-2e3f-4f11-ac56-da57036945bf) |


## 🚀 Features

- 📁 Modular Structure: Organized by feature for easy navigation and scalability.
- 💨 Faster Execution with tsx: Rapid TypeScript execution with esbuild, complemented by tsc for type checking.
- 🌐 Stable Node Environment: Latest LTS Node version in .nvmrc.
- 🔧 Simplified Environment Variables with Envalid: Centralized and easy-to-manage configuration.
- 🔗 Path Aliases: Cleaner code with shortcut imports.
- 🔄 Dependabot Integration: Automatic updates for secure and up-to-date dependencies.
- 🔒 Security: Helmet for HTTP header security and CORS setup.
- 📊 Logging: Efficient logging with pino-http.
- 🧪 Comprehensive Testing: Robust setup with Vitest and Supertest.
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality.
- ✅ Unified Code Style: ESLint and Prettier for a consistent coding standard.
- 📃 API Response Standardization: ServiceResponse class for consistent API responses.
- 🐳 Docker Support: Ready for containerization and deployment.
- 📝 Input Validation with Zod: Strongly typed request validation using Zod.
- 🧩 API Spec Generation: Automated OpenAPI specification generation from Zod schemas to ensure up-to-date and accurate API documentation.

## 🛠️ Getting Started

### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/kelevra9900/code-challenge-2024.git`
- Navigate: `cd code-challenge-2024`
- Install dependencies: `yarn`

### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

### Step 3: 🏃‍♂️ Running the Project (Frontend & Backend)

- Run the project: `yarn dev`
- Open the browser: `http://localhost:3001`
- Check the API documentation: `http://localhost:8080/`

## 📁 Project Structure Backend

```
.
├── api
│   ├── content
│   │   ├── __tests__
│   │   │   └── contentRouter.test.ts
│   │   ├── contentModel.ts
│   │   ├── contentRepository.ts
│   │   ├── contentRouter.ts
│   │   └── contentService.ts
│   ├── healthCheck
│   │   ├── __tests__
│   │   │   └── healthCheckRouter.test.ts
│   │   └── healthCheckRouter.ts
│   ├── theme
│   │   ├── __tests__
│   │   │   └── themeRouter.test.ts
│   │   ├── themeModel.ts
│   │   ├── themeRepository.ts
│   │   ├── themeRouter.ts
│   │   └── themeService.ts
│   └── user
│       ├── __tests__
│       │   ├── userRouter.test.ts
│       │   └── userService.test.ts
│       ├── userModel.ts
│       ├── userRepository.ts
│       ├── userRouter.ts
│       └── userService.ts
├── api-docs
│   ├── __tests__
│   │   └── openAPIRouter.test.ts
│   ├── openAPIDocumentGenerator.ts
│   ├── openAPIResponseBuilders.ts
│   └── openAPIRouter.ts
├── common
│   ├── __tests__
│   │   ├── errorHandler.test.ts
│   │   └── requestLogger.test.ts
│   ├── middleware
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   └── requestLogger.ts
│   ├── models
│   │   └── serviceResponse.ts
│   └── utils
│       ├── commonValidation.ts
│       ├── envConfig.ts
│       └── httpHandlers.ts
├── index.ts
└── server.ts

```

## 🤝 Feedback and Contributions

Feedback and contributions are always welcome! If you have any suggestions or ideas to improve this project, please feel free to open an issue or submit a pull request.

🎉 Happy coding!
