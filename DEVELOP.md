# Developing Components with Stencil

## Table of Contents

- [Introduction](#introduction)
- [Lifecycle](#lifecycle)

## Introduction

## Lifecycle

Most tasks should be run from the root of the project. This allows nx orchestrate and cache dependant tasks.

### Develop

Start stencil development build in watch mode and storybook development server.

```
npm run dev
```

### Test

[cypress](https://docs.cypress.io/) component testing with storbook stories.
You can run cypress in interactive mode:

```
npm run test
```

Or non-interactive (ci) mode:

```
npm run test:ci
```

### Other tasks

You can optionally run the stencil development server instead of storybook:

```
npm run start:stencil
```

#### Further information

- [Storybook and Cypress](storybook/DEVELOP.md)
- [Stencil](stencil/DEVELOP.md)
- [React](react/DEVELOP.md)
