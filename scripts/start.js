
// Requires

const { execSync } = require('child_process'),
      logBox       = require('log-box');


// Script

logBox(`Starting Electron`);

execSync(`electron .`, {
  stdio: 'inherit'
});
