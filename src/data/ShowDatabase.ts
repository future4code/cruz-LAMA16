import Database from "./Database";

class ShowDatabase extends Database{
  constructor() {
    super('lama_shows');
  }
}

export default new ShowDatabase()