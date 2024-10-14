const os = require('os');
const path = require('path');
const readline = require('readline');

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

printCurrentDirectory();

rl.on('line', (input) => {
  const command = input.trim();

  if (command === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  } else {
    console.log('Invalid input');
    printCurrentDirectory();
  }
});

rl.on('close', () => {
  process.exit(0);
});
