const { createReadStream, createWriteStream } = require('fs');

const handleStreamCommand = (command, printCurrentDirectory) => {
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

module.exports = handleStreamCommand;
