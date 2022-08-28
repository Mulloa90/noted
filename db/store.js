const fs = require("fs");
const util = require("util");
const { uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  write() {}

  getNotes() {
    return this.read().then((notes) => {
      return [].concat(JSON.parse(notes))
    });
  }
}

module.exports = new Store();
