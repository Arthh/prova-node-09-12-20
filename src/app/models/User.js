import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // campos aceitos na req.body
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        /**
         * O CAMPO PASSWORD É VIRTUAL POIS SO VAI EXISTIR NA REQUISIÇÃO, NÃO EXISTE NO BANCO DE DADOS!
         */
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // criptografando a senha
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // if password_hash === password
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
