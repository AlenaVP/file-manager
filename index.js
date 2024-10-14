const os = require('os');
const path = require('path');
const readline = require('readline');
const handleFileCommand = require('./command/fileOperations');
const handleStreamCommand = require('./command/streamOperations');
const handleOsCommand = require('./command/osOperations');
const handleHashCommand = require('./command/hashOperations');
const handleCompressCommand = require('./command/compressOperations');

// Parse command line arguments
const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';

console.log(`Welcome to the File Manager, ${username}!`);

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const homeDir = os.homedir();
let currentDir = homeDir;

const printCurrentDirectory = () => {
  console.log(`You are currently in ${currentDir}`);
};

printCurrentDirectory();

// Main command handler
rl.on('line', async (input) => {
  const command = input.trim();

  if (command === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  } else if (command.startsWith('os')) {
    handleOsCommand(command, printCurrentDirectory);
  } else if (command.startsWith('read') || command.startsWith('write')) {
    handleStreamCommand(command, printCurrentDirectory);
  } else if (command.startsWith('hash')) {
    handleHashCommand(command, printCurrentDirectory);
  } else if (command.startsWith('compress') || command.startsWith('decompress')) {
    handleCompressCommand(command, printCurrentDirectory);
  } else {
    await handleFileCommand(command, printCurrentDirectory);
  }
});

rl.on('close', () => {
  process.exit(0);
});
