const os = require('os');
const path = require('path');
const readline = require('readline');
const handleFileCommand = require('./command/fileOperations');
const handleStreamCommand = require('./command/streamOperations');
const handleOsCommand = require('./command/osOperations');
const handleHashCommand = require('./command/hashOperations');
const handleCompressCommand = require('./command/compressOperations');

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';

console.log(`Welcome to the File Manager, ${username}!`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const homeDir = os.homedir();
let currentDir = homeDir;

const printCurrentDirectory = () => {
  console.log(`You are currently in ${currentDir}`);
};

const setCurrentDir = (newDir) => {
  currentDir = newDir;
};

printCurrentDirectory();

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
    handleHashCommand(command, currentDir, printCurrentDirectory);
  } else if (command.startsWith('compress') || command.startsWith('decompress')) {
    handleCompressCommand(command, printCurrentDirectory);
  } else {
    await handleFileCommand(command, currentDir, setCurrentDir, printCurrentDirectory);
    printCurrentDirectory();
  }
});

rl.on('close', () => {
  process.exit(0);
});
