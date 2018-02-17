
const fse            = require('fs-extra'),
      logBox         = require('log-box'),
      parseArgs      = require('minimist'),
      { execSync }   = require('child_process');

const args           = parseArgs(process.argv.slice(2));

const appId          = process.env.npm_package_name,
      appTitle       = process.env.npm_package_productName || process.env.npm_package_name,
      appVersion     = process.env.npm_package_version;

const packageTarget  = args.target || 'mac',
      targetPrefix   = `npm_package_config_targets_${packageTarget}`;

const appPlatform    = process.env[`${targetPrefix}_platform`] || 'darwin',
      appArch        = process.env[`${targetPrefix}_arch`]     || 'x64',
      appIcon        = process.env[`${targetPrefix}_icon`]     || undefined,
      envPath        = process.env[`${targetPrefix}_envPath`]  || undefined;

const pathBuild      = process.env.npm_package_config_pathBuild  || 'app/build',
      pathOutput     = process.env.npm_package_config_pathOutput || 'packages',
      outputFilename = `${appTitle}-${appPlatform}-${appArch}`;

const date           = new Date(),
      dateString     = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2),
      zipPackage     = process.env.npm_package_config_zipPackage === true,
      zipFilename    = `${dateString}-${appId}-${appPlatform}-${appArch}.zip`;


const getCmd = () => {

  let cmd = '';

  cmd += `webpack --config ./webpack.prod.js;`
      +  `mkdir -p ${pathOutput};`;

  if (envPath) {
    cmd += `test "$?BASH_VERSION" = "0" || eval 'setenv() { export "$1=$2"; }';`
        +  `setenv PATH "${envPath}:$PATH";`;
  }

  cmd += `electron-packager . '${appTitle}' --out=${pathOutput} --overwrite`;

  if (appIcon && fse.pathExistsSync(appIcon)) {
    cmd += ` --icon=${appIcon}`
  }

  cmd += ` --platform=${appPlatform} --arch=${appArch};`;

  if (zipPackage) {
    cmd += `cd ${pathOutput};`
        +  `zip -r '${zipFilename}' '${outputFilename}';`
        +  `rm -rf '${outputFilename}';`
        +  `cd ..;`;
  }

  return cmd;

};


logBox(`Packaging '${appTitle}' v${appVersion} for ${appPlatform}-${appArch}`);

fse.removeSync(`${pathBuild}`);

execSync(getCmd(), { stdio: 'inherit' });

logBox(`Package ready: ${pathOutput}/${zipPackage ? zipFilename : outputFilename}`);
