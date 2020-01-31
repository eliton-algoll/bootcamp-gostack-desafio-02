import * as Yup from 'yup';

// import do model Recipient
import Recipient from '../models/Recipient';

// criando schema para validação, neste caso estou criando aqui porque a validação
// tanto para criação como para edição são as mesmas
const schema = Yup.object().shape({
  name: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  street: Yup.string().required(),
  complement: Yup.string(),
  number: Yup.number().required(),
  zip_code: Yup.string().required(),
});

class RecipientController {
  async store(req, res) {
    // validando os dados e retornando menssagem de erro específica
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    // estando tudo certo prossegue com a criação do destinatário
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    // resgatando id do parãmetro
    const { id } = req.params;
    // validando os dados e retornando menssagem de erro específica
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    // buscando se existe recipient
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // realizando a edição
    await recipient.update(req.body);

    // retornando destinatário editado
    return res.json(recipient);
  }
}

export default new RecipientController();
