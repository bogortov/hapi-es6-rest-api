import fs from 'fs';

const testFolder = '../routes';

fs.readdir(testFolder, (err, files) => {
  console.log(err, files);
});
