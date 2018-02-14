# Electron React Starter
Boilerplate for Electron + React apps.


## Contents
- [Installation](#installation)
- [Folder structure](#folder-structure)
- [Scripts](#scripts)


## Installation

1. [Download](https://github.com/sccottt/electron-react-starter/archive/master.zip) the repo
1. Update `package.json` to fit your specific project
1. Install dependencies

    ```bash
    $ cd path/to/your-project
    $ npm install
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


## Scripts

*Note: Scripts are set up to be run on macOS (but maybe work on Windows?).*


### Dev using the browser

Build & watch the application using [webpack-dev-server](https://github.com/webpack/webpack-dev-server). This can be especially useful for quick CSS injection.

```bash
$ npm run dev:web
```

### Build for Electron

Watch for changes in the `app/src/` folder and rebuild `app/build/` in real time:

```bash
$ npm run dev
```

Rebuild the `app/build/` folder for Electron a single time:

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

Create a native application for macOS or Windows. These scripts rebuild the `app/build/` folder for production and run [Electron Packager](https://github.com/electron-userland/electron-packager) to create native applications.

```bash
$ npm run package
```

```bash
$ npm run package:win
```

Packaging an application for Windows (using macOS) requires [Wine](https://www.winehq.org) be installed.


#### Package configuration

Default configuration of the package script can be overwritten in the `package.json` file inside the namespace `packageApp`:

```js
{
  "name": "electron-react-starter",
  ...
  "packageApp": {
    "buildFolder": "app/build",
    "outputFolder": "app/packages",
    "zip": false,
    "appIcon": {
      "icns": "app/resources/app-icon.icns",
      "ico": "app/resources/app-icon.ico"
    },
    "arch": "x64",
    "winePath": "/Applications/Wine Stable.app"
  },
  ...
}
```

##### Config values
- `buildFolder` [string]: the name of the folder where webpack builds the app (default: `"app/build"`)
- `outputFolder` [string]: the name of the folder packaged apps will be created in (default: `"app/packages"`)
- `zip` [boolean]: automatically create a date-stamped zip file of the packaged app (default: `false`)
- `appIcon` [object]: paths to Mac (`icns`) and Windows (`ico`) app icons (default: `undefined`)
- `arch` [string]: processor architecture (default: `"x64"`)
- `winePath` [string]: path to [Wine](https://www.winehq.org) application, which must be installed in order to package for Windows


### Other scripts

Clear the `node_modules` folder and reinstall all modules:

```bash
$ npm run reinstall
```

Fix permissions to the scripts in the `scripts` folder so they're executable.

```bash
$ npm run enable-scripts
```
Clear the `app/packages` folder. Especially useful as packages can become locked by the OS and difficult to delete manually.

```bash
$ npm run clear-packages
```
