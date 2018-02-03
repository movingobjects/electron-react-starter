
// Requires

const { execSync } = require('child_process'),
      logBox       = require('log-box');


// Script

logBox(`Starting Electron`, {
  style: 'round',
  color: '#cf0'
});

execSync(`electron .`, {
  stdio: 'inherit'
});
