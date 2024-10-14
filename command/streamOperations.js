const { createReadStream, createWriteStream } = require('fs');

const handleStreamCommand = (command) => {
  const [operation, ...args] = command.split(' ');

  switch (operation) {
    case 'read':
      const readStream = createReadStream(args[0]);
      readStream.pipe(process.stdout);
      readStream.on('end', () => printCurrentDirectory());
      break;
    case 'write':
      const writeStream = createWriteStream(args[0]);
      process.stdin.pipe(writeStream);
      process.stdin.on('end', () => printCurrentDirectory());
      break;
    default:
      console.log('Invalid input');
      printCurrentDirectory();
  }
};

rl.on('line', async (input) => {
  const command = input.trim();

  if (command === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  } else if (command.startsWith('read') || command.startsWith('write')) {
    handleStreamCommand(command);
  } else {
    await handleCommand(command);
  }
});
