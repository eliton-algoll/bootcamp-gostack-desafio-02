import Sequelize from 'sequelize';

import dbConfig from '../config/database';

// models
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';

const models = [User, Recipient, File, Deliveryman];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);

    models
      .map(model => model.init(this.connection))
      // se o model tiver o método associate, ele passa os models como parãmetro
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
