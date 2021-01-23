import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Erro de entrada de dados!' });

    const usernameExists = await User.findOne({
      where: { username: req.body.username },
    });

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (usernameExists)
      return res.status(400).json({ error: 'Username já existe!' });
    if (emailExists) return res.status(400).json({ error: 'Email já existe!' });

    const { id, name, username, email } = await User.create(req.body);
    return res.json({
      id,
      name,
      username,
      email,
    });
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);
    return res.json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      username: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().required(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      // eslint-disable-next-line no-shadow
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Erro de validação' });

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuario já existe' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, name, provider, username } = await user.update(req.body);

    return res.json({
      username,
      id,
      name,
      email,
      provider,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(400).json({ error: 'User não existe!' });

    await user.destroy();

    return res.json('User deletado!');
  }
}

export default new UserController();
