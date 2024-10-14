const fs = require('fs').promises;

const handleCommand = async (command) => {
  const [operation, ...args] = command.split(' ');

  try {
    switch (operation) {
      case 'copy':
        await fs.copyFile(args[0], args[1]);
        console.log('File copied successfully');
        break;
      case 'move':
        await fs.rename(args[0], args[1]);
        console.log('File moved successfully');
        break;
      case 'delete':
        await fs.unlink(args[0]);
        console.log('File deleted successfully');
        break;
      case 'rename':
        await fs.rename(args[0], args[1]);
        console.log('File renamed successfully');
        break;
      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.log('Operation failed');
  }

  printCurrentDirectory();
};

rl.on('line', async (input) => {
  const command = input.trim();

  if (command === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  } else {
    await handleCommand(command);
  }
});
