import fs from 'fs';
import appRoot from 'app-root-path';
import log from 'cllc';

export const deleteFile = (filePath) => {
  fs.unlinkSync(filePath);
};

export const renameFile = (name, newName) => new Promise((resolve, reject) => {
  fs.rename(name, newName, function(err) {
    if (err) console.log(`Нет файла (${name}) для переименования`);

    resolve();
  });
});

export const makeFile = (nameFile, fileBody) => {
  fs.writeFileSync(nameFile, fileBody);
};

export const makeFolder = (nameFolder) => {
  fs.mkdir(nameFolder, err => {
    if (err) {
      log().warn(`Не удалось создать папку ${nameFolder}`);
      log().warn(`${err}`);
    }

    if (!err) log().info(`Папка ${nameFolder} успешно создана`);
  });
};

export const makeResultsFolder = () => {
  makeFolder('./results');
};

const renameFileFunc = (path, name, extension) => new Promise((resolve, reject) => {
  fs.access(`${appRoot.path}/results/shop-result/${name}${extension}`, fs.F_OK, (err) => {
    if (err) {
      log().warn(`Файла ${name} не существует`);
      resolve();

      return;
    }

    fs.rename(`${path}${name}${extension}`, `${path}${name}-prev${extension}`, function(err) {
      if (err) log().error('ERROR: ' + err);

      resolve();
    });
  });
});

export const renameFileForAnalitics = async ({ path, name, extension, callback}) => {
  await renameFileFunc(path, name, extension);

  callback();
};

export const readJSONFileToAnalitics = (name, path = './results/shop-result') => new Promise((resolve, reject) => {
  let obj;

  fs.readFile(`${path}/${name}.json`, 'utf8', function(err, data) {
    if (err) {
      resolve(null);

      return;
    }

    obj = JSON.parse(data);

    resolve(obj);
  });
});