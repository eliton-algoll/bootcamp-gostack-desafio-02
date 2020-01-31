import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

// importando as configurações para gerar o token
import authConfig from '../../config/auth';

// importando o model de usuários
import User from '../models/User';

class SessionController {
  async store(req, res) {
    // criando o schema com as validações
    const schema = Yup.object().shape({
      email: Yup.string()
        .required()
        .email(),
      password: Yup.string().required(),
    });

    // verificando se os dados que vieram na requisição são válidos e retornnado
    // as menssagens de erro
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    // resgatando os dados da requisição
    const { email, password } = req.body;

    // buscando o usuário no banco de dados
    const user = await User.findOne({ where: { email } });

    // caso não encontre um usuário já retorna mensssagem de erro
    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    // caso a senha não combine com a senha cadastrada, retorna menssagem de erro
    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Password not match' });
    }

    // estando a senha e o email corretos e existir o usuario, é criado o token JWT
    // além disso só retorno os dados que julgo importantes para o front
    const { id, name } = user;

    return res.json({
      user: { id, name, email },
      // criando o token passando os dados que quero incorporar, a hash secreta e o prazo de expiração
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
