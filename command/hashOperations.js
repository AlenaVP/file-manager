const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const handleHashCommand = (command, currentDir, printCurrentDirectory) => {
  const [operation, ...args] = command.split(' ');

  if (operation === 'hash') {
    const filePath = path.resolve(currentDir, args[0]);
    const hash = crypto.createHash('sha256');
    const readStream = fs.createReadStream(filePath);

    readStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    readStream.on('end', () => {
      console.log(hash.digest('hex'));
      printCurrentDirectory();
    });

    readStream.on('error', (error) => {
      if (error.code === 'ENOENT') {
        console.log(`File not found: ${filePath}`);
      } else {
        console.log('Unable to calculate hash', error);
      }
      printCurrentDirectory();
    });
  } else {
    console.log('Invalid hash command');
    printCurrentDirectory();
  }
};

module.exports = handleHashCommand;
