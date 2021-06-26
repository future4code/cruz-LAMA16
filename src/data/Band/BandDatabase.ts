import Database from "../Database";

class BandDatabase extends Database {
  constructor() {
    super("lama_bands");
  }
}

export default new BandDatabase();
