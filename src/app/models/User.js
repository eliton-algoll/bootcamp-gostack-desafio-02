import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    /*
      método que gera a hash da senha antes de salvar os dados no banco de dados
      este método addHook recebe como promeiro parâmetro o momento de execução, neste caso 'antes de salvar'
      e o segundo parâmetro é uma função que executará as alterações
    */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    // o bcrypt.compare, compara uma senha enviada por parâmetro com outra hash cadastrada
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
