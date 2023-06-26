const fs = require('fs');
const appRoot = require('app-root-path');
const log = require('cllc')();


const deleteFile = (filePath) => {
  fs.unlinkSync(filePath);
};

const renameFile = (name, newName) => new Promise((resolve, reject) => {
  fs.rename(name, newName, function(err) {
    if (err) console.log(`Нет файла (${name}) для переименования`);

    resolve();
  });
});

const makeFile = (nameFile, fileBody) => {
  require('fs').writeFileSync(nameFile, fileBody);
};

const makeFolder = (nameFolder) => {
  fs.mkdir(nameFolder, err => {
    if (err) {
      log.warn(`Не удалось создать папку ${nameFolder}`);
      log.warn(`${err}`);
    }

    if (!err) log.info(`Папка ${nameFolder} успешно создана`);
  });
};

const makeResultsFolder = () => {
  makeFolder('./results');
};

const renameFileFunc = (path, name, extension) => new Promise((resolve, reject) => {
  fs.access(`${appRoot.path}/results/shop-result/${name}${extension}`, fs.F_OK, (err) => {
    if (err) {
      log.warn(`Файла ${name} не существует`);

      resolve();
      return;
    }

    fs.rename(`${path}${name}${extension}`, `${path}${name}-prev${extension}`, function(err) {
      if (err) log.error('ERROR: ' + err);

      resolve();
    });
  });
});

const renameFileForAnalitics = async ({ path, name, extension, callback}) => {
  await renameFileFunc(path, name, extension);

  callback();
};

const readJSONFileToAnalitics = (name) => new Promise((resolve, reject) => {
  let obj;

  fs.readFile(`./results/shop-result/${name}.json`, 'utf8', function(err, data) {
    if (err) {
      resolve(null);

      return;
    }

    obj = JSON.parse(data);

    resolve(obj);
  });
});

exports.renameFileForAnalitics = renameFileForAnalitics;
exports.readJSONFileToAnalitics = readJSONFileToAnalitics;
exports.makeResultsFolder = makeResultsFolder;
exports.makeFolder = makeFolder;
exports.makeFile = makeFile;
exports.deleteFile = deleteFile;
exports.renameFile = renameFile;