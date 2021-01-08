const { readFile, writeFile } = require('fs/promises');

class HeroRepository {
  constructor({ file }) {
    this.file = file;
  }

  async _currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  async find(itemId) {
    const all = await this._currentFileContent();

    if (!itemId) return all;

    return all.find(({ id }) => itemId === id);
  }

  async create(data) {
    const currentFile = await this._currentFileContent();
    currentFile.push(data);

    await writeFile(this.file, JSON.stringify(currentFile));

    return data.id;
  }
}

module.exports = HeroRepository;

// const heroRepository = new HeroRepository({
//   file: './../../database/data.json'
// });

// heroRepository.create({
//   id: 2,
//   name: 'Patrick Lima',
//   age: 27,
//   power: 'Young'
// }).then(console.log).catch(error => console.log('error', error));

// heroRepository.find(2).then(console.log).catch(error => console.log('error', error));