const { spawn } = require('child_process');

const nauticalNarwhalsOnLocal = 'npx hardhat test test/nauticalNarwhalsNFT.test.js';
const vRFConsumerOnTestnet = 'npx hardhat test test/VRFConsumer.test.js --network rinkeby';


runShellCommand(`${nauticalNarwhalsOnLocal} && ${vRFConsumerOnTestnet}`);


function runShellCommand(command){
  var child = spawn(command, { shell: true });

  child.stderr.on('data',  data => {
    console.log(`stderr: ${data}`);
  });
  child.stdout.on("data", data => {
    console.log(`${data}`);
  });
  child.on('error', error => {
    console.log(`error: ${error.message}`);
  });
  child.on('close', exitCode => {
    console.log(`Child process exited with code: ${exitCode}`);
  });
}