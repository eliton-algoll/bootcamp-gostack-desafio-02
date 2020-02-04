import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  // método para listar os entregadores
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      include: [{ model: File, as: 'avatar', attributes: ['path', 'url'] }],
      attributes: ['id', 'name', 'email', 'avatar_id'],
    });

    return res.json(deliverymans);
  }

  // método para criar um Entregador
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required()
        .email(),
      name: Yup.string().required(),
    });

    // verificando se os dados que vieram na requisição são válidos e retornnado
    // as menssagens de erro
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  // método para atualizar um entregador
  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required()
        .email(),
      name: Yup.string().required(),
      avatar_id: Yup.number(),
    });

    // verificando se os dados que vieram na requisição são válidos e retornnado
    // as menssagens de erro
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const { id, name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({ deliveryman: { id, name, email, avatar_id } });
  }

  // método para deletar um entregador
  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    await deliveryman.destroy();

    return res.json();
  }
}

export default new DeliverymanController();
