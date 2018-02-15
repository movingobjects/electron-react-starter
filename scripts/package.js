
const fse            = require('fs-extra'),
      logBox         = require('log-box'),
      parseArgs      = require('minimist'),
      { execSync }   = require('child_process');

const args           = parseArgs(process.argv.slice(2), {
  alias: {
    w: 'windows'
  }
});

const appId          = process.env.npm_package_name,
      appTitle       = process.env.npm_package_productName || process.env.npm_package_name,
      appVersion     = process.env.npm_package_version;

const toWindows      = !!args.windows,
      appPlatform    = toWindows ? 'win32' : 'darwin',
      platformName   = toWindows ? 'Windows (via Wine)' : 'macOS',
      appArch        = process.env.npm_package_config_package_arch || 'x64',
      pathWine       = process.env.npm_package_config_package_pathWine || '/Applications/Wine Stable.app';

const appIconMac     = process.env.npm_package_config_package_appIcon_icns || undefined,
      appIconWin     = process.env.npm_package_config_package_appIcon_ico  || undefined,
      appIcon        = toWindows ? appIconWin : appIconMac;

const pathBuild      = process.env.npm_package_config_pathBuild || 'app/build',
      pathOutput     = process.env.npm_package_config_package_pathOutput || 'app/packages',
      outputFilename = `${appTitle}-${appPlatform}-${appArch}`;

const date           = new Date(),
      dateString     = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2),
      zipIt          = process.env.npm_package_config_package_zip === true,
      zipFilename    = `${dateString}-${appId}-${appPlatform}-${appArch}.zip`;


const getCmd = () => {

  let cmd = '';

  cmd += `webpack --config config/webpack.prod.js;`
      +  `mkdir -p ${pathOutput};`;

  if (toWindows) {
    cmd += `test "$?BASH_VERSION" = "0" || eval 'setenv() { export "$1=$2"; }';`
        +  `setenv PATH "${pathWine}/Contents/Resources/start/bin:${pathWine}/Contents/Resources/wine/bin:$PATH";`;
  }

  cmd += `electron-packager . '${appTitle}' --out=${pathOutput} --overwrite`;

  if (appIcon && fse.pathExistsSync(appIcon)) {
    cmd += ` --icon=${appIcon}`
  }

  cmd += ` --platform=${appPlatform} --arch=${appArch};`;

  if (zipIt) {
    cmd += `cd ${pathOutput};`
        +  `zip -r '${zipFilename}' '${outputFilename}';`
        +  `rm -rf '${outputFilename}';`
        +  `cd ..;`;
  }

  return cmd;

};


logBox(`Packaging '${appTitle}' v${appVersion} for ${platformName}`);

fse.removeSync(`${pathBuild}`);

execSync(getCmd(), { stdio: 'inherit' });

logBox(`Package ready: ${pathOutput}/${zipIt ? zipFilename : outputFilename}`);
