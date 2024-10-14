const { createReadStream, createWriteStream } = require('fs');
const zlib = require('zlib');

const handleCompressCommand = (command, printCurrentDirectory) => {
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

module.exports = handleCompressCommand;
