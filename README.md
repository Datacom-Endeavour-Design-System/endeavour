# Datacom Endeavour

Datacom Endeavour is a web component library for Datacom branding.

## Table of Contents

- [Datacom Endeavour](#datacom-endeavour)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Structure](#structure)
    - [Packages](#packages)
    - [Stencil web components](#stencil-web-components)
    - [React components](#react-components)
  - [Getting Started](#getting-started)
    - [Initialise project](#initialise-project)
    - [Start Storybook](#start-storybook)
    - [Start Stencil](#start-stencil)
  - [Nx and mono-repo management](#nx-and-mono-repo-management)
  - [Lifecycle](#lifecycle)
  - [Developing](#developing)
  - [References](#references)

## Introduction

## Structure

The Endeavour project has the following structure:

### Packages

Packages are libraries that are outputs of the project or inputs in other libraries or applications. Packages are sub-directories in [packages](packages)

### Stencil web components

[Stencil](https://stenciljs.com/docs/introduction) is an abstraction over [Web components](https://www.webcomponents.org/). These components may be used standalone in any browser regardless of the rendering Framework.

New components are developed first as web components and then subsequently wrapped as React components.

### React components

The React components are generated from the Stencil web components. This project may include additional helpers, such as hooks or high-level components.

## Getting Started

To develop and run you will need NodeJs > 16 (LTS)

### Initialise project

Install npm dependencies:

```
npm install
```

### Build and package

Build all dependencies and package for deployment and distribution:

```
npm run package
```

### Testing

Run test suite in non-interactive mode:

```
npm run test:ci
```

## Nx and mono-repo management

The project is structured as a monorepo with [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

This project uses [nx](https://nx.dev) to orchestrate and cache project lifecycle tasks.

## Lifecycle

The following lifecycle events or jobs are available at the top-project.

| Name     | Description                                                          |
| -------- | -------------------------------------------------------------------- |
| clean    | Clean applications of build artifacts                                |
| dev      | Start development servers in watch mode                              |
| build    | Compile application outputs                                          |
| test     | Open interactive test suite                                          |
| test:ci  | Run test suite in non-interactive mode                               |
| start:\* | Start individual development servers. <br/>_ stencil<br/>_ storybook |
| package  | Build and package all libraries and applications                     |

## Developing

See [Developing](DEVELOP.md) for more information.

## References

- [Figma](https://www.figma.com/file/uwbSMmWjue3ZAKnpCG3fZM/Datacom-Endeavour-Design-Kit-V1.0?node-id=1%3A8)
