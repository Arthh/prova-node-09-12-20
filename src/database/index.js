import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

/**
 * DEIXANDO PRONTO UM ARRAY DE MODELS, CASO OUTROS NECESSITEM SER CRIADOS!
 */

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
