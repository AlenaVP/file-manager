const handleOsCommand = (command) => {
  switch (command) {
    case 'os --cpus':
      console.log(os.cpus());
      break;
    case 'os --homedir':
      console.log(os.homedir());
      break;
    case 'os --username':
      console.log(os.userInfo().username);
      break;
    case 'os --architecture':
      console.log(os.arch());
      break;
    default:
      console.log('Invalid input');
  }

  printCurrentDirectory();
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
  } else {
    await handleCommand(command);
  }
});
