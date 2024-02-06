const jsonfile = require('jsonfile');
const fs = require('fs');

let _dir = `${__dirname}/data/`;

const readFiles = () => {
  let info = [];

  try {
    const data = fs.readdirSync(_dir, { withFileTypes: true });
    data.map(file => {
      let data = [];
      if (file.name.includes('.json')) {
        const _file = `${_dir}/${file.name}`;
        const content = jsonfile.readFileSync(_file, { encoding: 'utf8', flag: 'r' });

        content.forEach(d => {
          data.push(d);
        });

        info.push({ name: file.name, data });
      }
      return null;
    });
  } catch (error) {
    console.log({ error });
  }

  return info;
};

module.exports = {
  readFiles
};
