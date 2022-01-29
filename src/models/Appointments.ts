const { v4: uuid } = require('uuid');

class Appointment{
  id: string;
  provider: string;
  date: Date;

  constructor({provider, date}: Omit<Appointment,'id'>){
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}
