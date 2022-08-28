const fs = require("fs");
const util = require("util");
const { v4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      return [].concat(JSON.parse(notes));
    });
  }
  addNote(note) {
    note.id = v4();

    if (!note.title || !note.text) {
      throw new Error("Title or Text cannot be blank");
    }

    return this.getNotes()
      .then((notes) => [...notes, note])
      .then((result) => this.write(result))
      .then(() => note);
  }
}

module.exports = new Store();
