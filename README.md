# Datacom Endeavour
Datacom Endeavour is a web component library for Datacom branding.

## Table of Contents
- [Datacom Endeavour](#datacom-endeavour)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Lifecycle](#lifecycle)
  - [Getting Started](#getting-started)
    - [Initialise project](#initialise-project)
    - [Start Storybook](#start-storybook)
    - [Start Stencil](#start-stencil)
  - [Developing](#developing)
  - [References](#references)
  
 
## Introduction

### Lifecycle
| Name    | Description                                                                  |
| ------- | ---------------------------------------------------------------------------- |
| build   | Compile application outputs                                                  |
| clean   | Clean applications of build artifacts                                        |
| start:* | Start development servers. Known sub-tasks are<br/>* stencil<br/>* storybook |
| package | Build and package all libraries and applications                             |

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

## Developing
See [Developing](DEVELOP.md) for more information.

## References
* [Figma](https://www.figma.com/file/uwbSMmWjue3ZAKnpCG3fZM/Datacom-Endeavour-Design-Kit-V1.0?node-id=1%3A8)
  