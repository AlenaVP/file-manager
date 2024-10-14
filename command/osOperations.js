const os = require('os');

const handleOsCommand = (command, printCurrentDirectory) => {
  switch (command) {
    case 'os --EOL':
      console.log(JSON.stringify(os.EOL));
      break;
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

module.exports = handleOsCommand;
