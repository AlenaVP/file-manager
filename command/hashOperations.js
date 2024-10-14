const { createReadStream } = require('fs');
const crypto = require('crypto');

const handleHashCommand = (command, printCurrentDirectory) => {
  const [operation, filePath] = command.split(' ');

  if (operation === 'hash') {
    const hash = crypto.createHash('sha256');
    const input = createReadStream(filePath);

    input.on('readable', () => {
      const data = input.read();
      if (data) {
        hash.update(data);
      } else {
        console.log(hash.digest('hex'));
        printCurrentDirectory();
      }
    });
  } else {
    console.log('Invalid input');
    printCurrentDirectory();
  }
};

module.exports = handleHashCommand;
