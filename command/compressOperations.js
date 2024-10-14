const zlib = require('zlib');

const handleCompressCommand = (command) => {
  const [operation, inputFile, outputFile] = command.split(' ');

  if (operation === 'compress') {
    const gzip = zlib.createGzip();
    const input = createReadStream(inputFile);
    const output = createWriteStream(outputFile);

    input.pipe(gzip).pipe(output).on('finish', () => {
      console.log('File compressed successfully');
      printCurrentDirectory();
    });
  } else if (operation === 'decompress') {
    const gunzip = zlib.createGunzip();
    const input = createReadStream(inputFile);
    const output = createWriteStream(outputFile);

    input.pipe(gunzip).pipe(output).on('finish', () => {
      console.log('File decompressed successfully');
      printCurrentDirectory();
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
  } else if (command.startsWith('compress') || command.startsWith('decompress')) {
    handleCompressCommand(command);
  } else {
    await handleCommand(command);
  }
});
