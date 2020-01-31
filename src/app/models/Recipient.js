import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        street: Sequelize.STRING,
        complement: Sequelize.STRING,
        number: Sequelize.INTEGER,
        zip_code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Recipient;
