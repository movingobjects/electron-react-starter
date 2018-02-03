
// Requires

const colors       = require('colors'),
      { execSync } = require('child_process');


// Script

console.log(`\nStarting Electron...\n`.cyan);

execSync(`electron .`, {
  stdio: 'inherit'
});
