import Database from "./Database";

class TicketsDatabase extends Database{
  constructor() {
    super('lama_tickets');
  }
}

export default new TicketsDatabase()