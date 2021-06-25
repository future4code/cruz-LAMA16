import Database from "../Database";

class UserDatabase extends Database{
  constructor() {
    super('lama_users');
  }
}

export default new UserDatabase()