
const fse          = require('fs-extra'),
      logBox       = require('log-box'),
      parseArgs    = require('minimist'),
      { execSync } = require('child_process'),
      pkg          = require('../package.json');

const args = parseArgs(process.argv.slice(2), {
  alias: {
    w: 'windows',
    z: 'zip'
  }
});

const isWindows      = !!args.windows,
      doZip          = !!args.zip;

const appTitle       = pkg.name,
      appArch        = 'x64',
      appPlatform    = isWindows ? 'win32' : 'darwin',
      platformName   = isWindows ? 'Windows (via Wine)' : 'macOS',
      outputFolder   = args.output || 'packages',
      outputFilename = `${appTitle}-${appPlatform}-${appArch}`,
      date           = new Date(),
      dateString     = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2),
      zipFilename    = `${dateString}-${appTitle}-mac.zip`,
      pathToWine     = `/Applications/Wine Stable.app`;

logBox(`Packaging ${appTitle} for ${platformName}`);

fse.removeSync(`app/build/*`);

let cmd = `webpack --config config/webpack.prod.js;`
        + `mkdir -p ${outputFolder};`;

if (isWindows) {
  cmd += `test "$?BASH_VERSION" = "0" || eval 'setenv() { export "$1=$2"; }';`
      + `setenv PATH "${pathToWine}/Contents/Resources/start/bin:${pathToWine}/Contents/Resources/wine/bin:$PATH";`;
}

cmd += `electron-packager . '${appTitle}' --out=${outputFolder} --overwrite --platform=${appPlatform} --arch=${appArch};`;

if (doZip) {
  cmd += `cd ${outputFolder};`
      + `zip -r '${zipFilename}' '${outputFilename}';`
      + `rm -rf '${outputFilename}';`
      + `cd ..;`;
}

execSync(cmd, { stdio: 'inherit' });

logBox(`Package ready: ${outputFolder}/${doZip ? zipFilename : outputFilename}`);
