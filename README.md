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
To develop and run you will need NodeJs > 14 (LTS)

### Initialise project
Install npm dependencies:
```
npm install
```
### Start Storybook
Start and launch storybook after compiling the web components and generating React wrapper code:
```
npm run start:storybook
```
### Start Stencil
Start and launch stencil web view after compiling web components:
```
npm run start:stencil
```

## Nx and mono-repo management
This project uses [nx](https://nx.dev) to manage nodejs libraries as applications in a single mono-repo. 

The project is structured as an [npm workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces). 
## Lifecycle
The following lifecycle events or jobs are available at the top-project. 

| Name    | Description                                                                  |
| ------- | ---------------------------------------------------------------------------- |
| build   | Compile application outputs                                                  |
| clean   | Clean applications of build artifacts                                        |
| start:* | Start development servers. Known sub-tasks are<br/>* stencil<br/>* storybook |
| package | Build and package all libraries and applications                             |

## Developing
See [Developing](DEVELOP.md) for more information.

## References
* [Figma](https://www.figma.com/file/uwbSMmWjue3ZAKnpCG3fZM/Datacom-Endeavour-Design-Kit-V1.0?node-id=1%3A8)
  