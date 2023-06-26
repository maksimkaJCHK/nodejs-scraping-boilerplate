const log = require('cllc')();
const fs = require('fs');

const makeResultsFolder = () => {
  fs.mkdir('./results', err => {
    if (err) {
      log.warn('Не удалось создать папку results');
      log.warn(`${err}`);
    }

    if (!err) log.info('Папка results успешно создана');
  });
};

exports.makeResultsFolder = makeResultsFolder;