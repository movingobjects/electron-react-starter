# Electron React Starter
Boilerplate for Electron + React apps.

*Note: Scripts are set up to be run on macOS (but maybe work on Windows?).*


## Install

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


## Dev using the browser

Build & watch the application using [webpack-dev-server](https://github.com/webpack/webpack-dev-server). This can be especially useful for quick CSS injection.

```bash
$ npm run dev:web
```


## Build for Electron

Watch for changes in the `app/src/` folder and rebuild `app/build/` in real time:

```bash
$ npm run dev
```

Rebuild the `app/build/` folder for Electron a single time:

```bash
$ npm run build
```


## Run in Electron

Run the build in Electron, using dev environment.

```bash
$ npm start
```

This is typically run while `npm run dev` is running in another Terminal tab.



## Package using Electron

Create a native application for macOS or Windows. These scripts rebuild the `app/build/` folder for production and run [Electron Packager](https://github.com/electron-userland/electron-packager) to create native applications.

```bash
$ npm run package
```

```bash
$ npm run package:win
```

Packaging an application for Windows (using macOS) requires [Wine](https://www.winehq.org) be installed.


### Package configuration

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



## Other scripts

Fix permissions to the scripts in the `scripts` folder so they're executable.

```bash
$ npm run enable-scripts
```

Clear the `node_modules` folder and reinstall all modules:

```bash
$ npm run reinstall
```
