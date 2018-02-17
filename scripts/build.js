
const fse          = require('fs-extra'),
      logBox       = require('log-box'),
      parseArgs    = require('minimist'),
      { execSync } = require('child_process');

const args         = parseArgs(process.argv.slice(2), {
  alias: {
    w: 'watch',
    b: 'browser'
  }
});

const appTitle     = process.env.npm_package_productName || process.env.npm_package_name,
      appVersion   = process.env.npm_package_version,
      pathBuild    = process.env.npm_package_config_pathBuild || 'app/build';

const verb         = args.watch ? 'Watching' : 'Building',
      platform     = args.browser ? 'the browser' : 'Electron';


const getCmd = () => {
  if (args.browser && args.watch) {
    return `webpack-dev-server --config ./webpack.dev.browser.js --hot --inline --open`;
  } else if (args.browser) {
    return `webpack --config ./webpack.dev.browser.js`;
  } else if (args.watch) {
    return `webpack --config ./webpack.dev.js --watch`;
  } else {
    return `webpack --config ./webpack.dev.js`;
  }
};


logBox(`${verb} '${appTitle}' v${appVersion} for ${platform}`);

fse.removeSync(`${pathBuild}`);

execSync(getCmd(), { stdio: 'inherit' });
