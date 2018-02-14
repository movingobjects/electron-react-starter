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
│   ├── packages
│   ├── resources
│   └── src
├── config
└── scripts
```

- #### `root`
    Stores `.gitignore`, `LICENSE`, `package.json`, and `README.md` files. Try to store files here as sparingly as possible.

- #### `app/`
    Stores source code, builds/packages, and resources related specifically to the application. Electron [main process](https://electronjs.org/docs/glossary#main-process) code (e.g., `main.js`) sits directly inside this folder.

    - #### `app/build/`
        Stores the Webpack compiled `app/src/` code. This is the code Electron uses for the [renderer process](https://electronjs.org/docs/glossary#renderer-process). _Ignored in `.gitignore`_.

    - #### `app/packages/`
        Stores the Electron packaged native applications. _Ignored in `.gitignore`_.

    - #### `app/resources/`
        Stores application-related resource files, like application icons.

    - #### `app/src/`
        Stores the source code (which includes React components and any other scripts, HTML, styles, fonts, images, etc) for the Electron [renderer process](https://electronjs.org/docs/glossary#renderer-process). These can be structured in whatever way makes sense for the project.

- #### `config/`
    Stores configuration files for Webpack, and potentially any other build-level configuration files.

- #### `scripts/`
    Stores NPM scripts detailed [below](#scripts).

## Configuration

Default configuration of the [scripts](#scripts) below can be overwritten in the `package.json` file, inside the `config` node:

```js
{
  "name": "electron-react-starter",
  ...
  "config": {
    "package": {
      "appIcon": {
        "icns": "app/resources/app-icon.icns",
        "ico": "app/resources/app-icon.ico"
      },
      "arch": "x64",
      "pathOutput": "app/packages",
      "pathWine": "/Applications/Wine Stable.app",
      "zip": false
    },
    "pathBuild": "app/build"
  },
  ...
}
```

- #### `package`
    Config values pertaining to the `package` script

    - #### `appIcon` [object]

        Paths to Mac (`icns`) and Windows (`ico`) app icons (default: `undefined`)

    - #### `arch` [string]

        Processor architecture (default: `"x64"`)

    - #### `pathOutput` [string]

        Path to the folder where packaged apps should be created (default: `"app/packages"`)

    - #### `pathWine` [string]

        Path to [Wine](https://www.winehq.org) application, which is required in order to package for Windows from macOS. (default: `"/Applications/Wine Stable"`)

    - #### `zip` [boolean]

        Create date-stamped zip file of packaged app (default: `false`)


- #### `pathBuild` [string]
    Path to folder where Webpack builds the app. (default: `"app/build"`)


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
