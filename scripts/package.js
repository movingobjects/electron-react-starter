
const PKG_CONF_NAMESPACE = 'packageApp';

const fse            = require('fs-extra'),
      logBox         = require('log-box'),
      parseArgs      = require('minimist'),
      { execSync }   = require('child_process'),
      pkg            = require('../package.json');

const args           = parseArgs(process.argv.slice(2), {
  alias: {
    w: 'windows'
  }
});

const pkgConf        = pkg[PKG_CONF_NAMESPACE] || {},
      toWindows      = !!args.windows;

const appId          = pkg.name,
      appTitle       = pkg.productName || pkg.name;

const appPlatform    = toWindows ? 'win32' : 'darwin',
      platformName   = toWindows ? 'Windows (via Wine)' : 'macOS',
      appArch        = pkgConf.arch || 'x64';

const appIconMac     = pkgConf.appIcon ? (pkgConf.appIcon.icns || undefined) : undefined,
      appIconWin     = pkgConf.appIcon ? (pkgConf.appIcon.ico  || undefined) : undefined,
      appIcon        = toWindows ? appIconWin : appIconMac;

const buildFolder    = pkgConf.buildFolder || 'app/build',
      outputFolder   = pkgConf.outputFolder || 'packages',
      outputFilename = `${appTitle}-${appPlatform}-${appArch}`,
      winePath       = pkgConf.winePath || '/Applications/Wine Stable.app';

const date           = new Date(),
      dateString     = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2),
      zipIt          = !!pkgConf.zip,
      zipFilename    = `${dateString}-${appId}-${appPlatform}-${appArch}.zip`;


const makeCmd = () => {

  let cmd = '';

  cmd += `webpack --config config/webpack.prod.js;`
      + `mkdir -p ${outputFolder};`;

  if (toWindows) {
    cmd += `test "$?BASH_VERSION" = "0" || eval 'setenv() { export "$1=$2"; }';`
        + `setenv PATH "${winePath}/Contents/Resources/start/bin:${winePath}/Contents/Resources/wine/bin:$PATH";`;
  }

  cmd += `electron-packager . '${appTitle}' --out=${outputFolder} --overwrite`;

  if (appIcon && fse.pathExistsSync(appIcon)) {
    cmd += ` --icon=${appIcon}`
  }

  cmd += ` --platform=${appPlatform} --arch=${appArch};`;

  if (zipIt) {
    cmd += `cd ${outputFolder};`
        + `zip -r '${zipFilename}' '${outputFilename}';`
        + `rm -rf '${outputFilename}';`
        + `cd ..;`;
  }

  return cmd;

}

logBox(`Packaging ${appTitle} for ${platformName}`);

fse.removeSync(`${buildFolder}/*`);

execSync(makeCmd(), { stdio: 'inherit' });

logBox(`Package ready: ${outputFolder}/${zipIt ? zipFilename : outputFilename}`);
