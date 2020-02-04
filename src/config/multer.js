import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

/* configuração do multer para realizar uploads a partir de requisiçõe smultpart form
   exporta um objeto contendo o 'storage' que retorna uma instancia do diskStorage do multer
   com as seguintes configurações:
   'destination': endereço da pasta conde salvar os arquivos
   'filename': nome que o arquivo será salvo
   */

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    filename: (req, file, calback) => {
      // aqui uso o crypto para gerar uma hash randomica com o nome original do arquivo
      // para garantir que não terão arquivos com nomes duplicados
      crypto.randomBytes(16, (err, res) => {
        // se tiver algum erro retorno mensagem
        if (err) return calback(err);

        return calback(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
