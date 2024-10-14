const crypto = require('crypto');

const handleHashCommand = (command) => {
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

rl.on('line', async (input) => {
  const command = input.trim();

  if (command === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  } else if (command.startsWith('os')) {
    handleOsCommand(command);
  } else if (command.startsWith('read') || command.startsWith('write')) {
    handleStreamCommand(command);
  } else if (command.startsWith('hash')) {
    handleHashCommand(command);
  } else {
    await handleCommand(command);
  }
});
