# Electron React Starter
Boilerplate for Electron + React apps.


## Contents
- [Installation](#installation)
- [Folder structure](#folder-structure)
- [Configuration](#configuration)
- [Scripts](#scripts)


## Installation

1. [Download](https://github.com/sccottt/electron-react-starter/archive/master.zip) the repo
1. Update `package.json` to fit your specific project
1. Install dependencies

    ```bash
    $ cd path/to/your-project
    $ npm install
    ```
1. Build the source

    ```bash
    $ npm run build
    ```
1. Start it up!

    ```bash
    $ npm start
    ```

You can also `git clone` or [mirror](https://help.github.com/articles/duplicating-a-repository/) the repo and retain the full commit history.


## Folder structure

```
root
├── app
│   ├── build
│   ├── resources
│   └── src
└── packages
└── scripts
```

- #### `root`
    Stores `.gitignore`, `package.json`, and `README.md`, along with Webpack and other configuration files (e.g., `.babelrc`, `.editorconfig`).

- #### `app`
    Stores source code and resources related specifically to the application. Electron [main process](https://electronjs.org/docs/glossary#main-process) code (e.g., `main.js`) sits directly inside this folder.

    - #### `app/build`
        The compiled build of the `app/src/` folder is created here. This is the code Electron uses for the [renderer process](https://electronjs.org/docs/glossary#renderer-process).

        _**Note**: Ignored in `.gitignore`._

    - #### `app/resources`
        Stores application-related resource files, like application icons.

    - #### `app/src`
        Stores the source code (which includes React components and any other scripts, HTML, styles, fonts, images, etc) for the Electron [renderer process](https://electronjs.org/docs/glossary#renderer-process). These can be structured in whatever way makes sense for the project.


- #### `packages`
    Electron packaged native application builds are created here (by default).

    _**Note**: Ignored in `.gitignore`. Path name configurable in `package.json`._

- #### `scripts`
    Stores NPM scripts detailed [below](#scripts).

## Configuration

Default configuration of the [NPM scripts](#scripts) below can be overwritten in the `package.json` file, inside the `config` node:

```js
{
  "name": "electron-react-starter",
  ...
  "config": {
    "pathBuild": "app/build",
    "pathOutput": "packages",
    "targets": {
      "mac": {
        "platform": "darwin",
        "arch": "x64",
        "icon": "app/resources/app-icon.icns"
      },
      "win": {
        "platform": "win32",
        "arch": "x64",
        "icon": "app/resources/app-icon.ico",
        "envPath": "/Applications/Wine Stable.app/Contents/Resources/start/bin:/Applications/Wine Stable.app/Contents/Resources/wine/bin"
      }
    },
    "zipPackage": false
  },
  ...
}
```
- #### `pathBuild` [string]

    Path to folder where Webpack compiles builds of the source (default: `"app/build"`)

    _**Note**: while this config value changes the path in the NPM scripts, it does not affect Webpack or Electron. To change the name of this folder, you will need to make changes in `webpack.common.json` and `app/main.js`._

- #### `pathOutput` [string]

    Path to the folder where packaged apps should be created (default: `"app/packages"`)


- #### `targets` [object]
    Settings for different output targets for packages

    - #### `platform` [string]

        Platform name — `darwin`, `win32`, or `linux` (default: `"darwin"`)

    - #### `arch` [string]

        Processor architecture (default: `"x64"`)

    - #### `icon` [string]

        Paths to Mac (`icns`) and Windows (`ico`) app icons (default: `undefined`)

    - #### `envPath` [string]

        Additional paths to add to PATH environment variable, which is useful for using Wine to create Windows apps from a Mac (default: `undefined`)

- #### `zipPackage` [boolean]

    Create date-stamped zip file of packaged app (default: `false`)


## Scripts

*Note: Scripts are set up to be run on macOS (but maybe work on Windows?).*


### Dev using the browser

Build & watch the application using [webpack-dev-server](https://github.com/webpack/webpack-dev-server). This can be especially useful for quick CSS injection.

```bash
$ npm run dev:web
```

### Build for Electron

Watch for changes in the `app/src/` folder and rebuild the app in real time:

```bash
$ npm run dev
```

Rebuild the app for Electron a single time:

```bash
$ npm run build
```

### Run in Electron

Run the build in Electron, using dev environment.

```bash
$ npm start
```

This is typically run while `npm run dev` is running in another Terminal tab.


### Package using Electron

Create a native application for macOS or Windows. These scripts rebuild the app for production and run [Electron Packager](https://github.com/electron-userland/electron-packager) to create native applications.

```bash
$ npm run package
```

```bash
$ npm run package:win
```

Packaging an application for Windows (using macOS) requires [Wine](https://www.winehq.org) be installed.


### Cleaning scripts

Clear the `node_modules` folder and reinstall all modules:

```bash
$ npm run reinstall
```

Fix permissions to the scripts in the `scripts` folder so they're executable:

```bash
$ npm run enable-scripts
```

Clear the outputted packages folder (especially useful as packages can become locked by the OS and difficult to delete manually):

```bash
$ npm run clear-packages
```

Perform the three above cleaning scripts:

```bash
$ npm run clean
```
