# Electron React Starter
Boilerplate for Electron + React apps.

All scripts are tested to be run on macOS. *Sorry not sorry!*


## Install

First, clone the repo via git:

```bash
git clone https://github.com/sccottt/electron-react-starter.git your-project-name
```

Then, install dependencies:

```bash
cd your-project-name
git install
```


## Build/watch

The build scripts rebuild the `app/build/` folder a single time, whereas the watch scripts watch for changes in the `app/src/` folder and update in real time.

**Note**: `npm run watch:web` uses [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/), which does not update the `app/build/` folder.


#### For Electron:

```bash
npm run build
npm run watch
```

#### For the browser:

```bash
npm run build:web
npm run watch:web
```

## Run in Electron

Run the build in Electron, using dev environment. This is typically done in combination with `npm run watch` during development.

```bash
npm start
```

## Package via Electron

Create a native application for macOS or Windows. These scripts rebuild the `app/build/` folder for production and run [Electron Packager](https://github.com/electron-userland/electron-packager) to create native applications.

```bash
npm run package
npm run package:win
```

The windows packager requires [Wine](https://www.winehq.org) be installed. The `scripts/package-win.sh` shell script should be updated to point to the Wine application.


## Other scripts

Fix permissions to the scripts in the `scripts` folder so they're executable.

```bash
npm run enable-scripts
```

Clear the `node_modules` folder and reinstall all modules:

```bash
npm run reinstall
```