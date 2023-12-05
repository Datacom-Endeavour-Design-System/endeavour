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

To import a theme from figma to css, the following two search and replace regex will parse it to valid css, note the regex must support multiline matches (ie vscode):

/^[^$#].\*\n//

/^\$(._)\n(._)/--dc-token-$1: $2;/

#### Further information

- [Storybook and Cypress](storybook/DEVELOP.md)
- [Stencil](stencil/DEVELOP.md)
- [React](react/DEVELOP.md)
