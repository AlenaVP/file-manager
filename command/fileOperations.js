const fs = require('fs').promises;
const path = require('path');
const { createReadStream } = require('fs');

const handleFileCommand = async (command, currentDir, setCurrentDir, printCurrentDirectory) => {
  const [operation, ...args] = command.split(' ');

  try {
    switch (operation) {
      case 'up':
        const parentDir = path.dirname(currentDir);
        if (parentDir !== currentDir) {
          setCurrentDir(parentDir);
        }
        break;
      case 'cd':
        const newDir = path.resolve(currentDir, args[0]);
        const stat = await fs.stat(newDir);
        if (stat.isDirectory()) {
          setCurrentDir(newDir);
        } else {
          console.log('Not a directory');
        }
        break;
      case 'ls':
        const files = await fs.readdir(currentDir, { withFileTypes: true });
        const sortedFiles = files.sort((a, b) => {
          if (a.isDirectory() && !b.isDirectory()) return -1;
          if (!a.isDirectory() && b.isDirectory()) return 1;
          return a.name.localeCompare(b.name);
        });
        console.table(sortedFiles.map((file, index) => ({
          Name: file.name,
          Type: file.isDirectory() ? 'directory' : 'file'
        })));
        break;
      case 'cat':
        const filePath = path.resolve(currentDir, args[0]);
        console.log(`Reading file: ${filePath}`);
        const readStream = createReadStream(filePath);
        readStream.pipe(process.stdout);
        readStream.on('end', () => {
          console.log();
          printCurrentDirectory();
        });
        break;
      case 'add':
        await fs.writeFile(path.resolve(currentDir, args[0]), '');
        console.log('File created successfully');
        break;
      case 'cp':
        const srcPath = path.resolve(currentDir, args[0]);
        let destPath = path.resolve(currentDir, args[1]);
        const destStat = await fs.stat(destPath).catch(() => null);
        if (destStat && destStat.isDirectory()) {
          destPath = path.join(destPath, path.basename(srcPath));
        }
        await fs.copyFile(srcPath, destPath);
        console.log('File copied successfully');
        break;
      case 'mv':
        const srcMovePath = path.resolve(currentDir, args[0]);
        let destMovePath = path.resolve(currentDir, args[1]);
        const destMoveStat = await fs.stat(destMovePath).catch(() => null);
        if (destMoveStat && destMoveStat.isDirectory()) {
          destMovePath = path.join(destMovePath, path.basename(srcMovePath));
        }
        await fs.rename(srcMovePath, destMovePath);
        console.log('File moved successfully');
        break;
      case 'rm':
        const deletePath = path.resolve(currentDir, args[0]);
        await fs.unlink(deletePath);
        console.log('File deleted successfully');
        break;
      case 'rn':
        const oldPath = path.resolve(currentDir, args[0]);
        const newPath = path.resolve(currentDir, args[1]);
        await fs.rename(oldPath, newPath);
        console.log('File renamed successfully');
        break;
      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.log('Operation failed', error);
  }
};

module.exports = handleFileCommand;
