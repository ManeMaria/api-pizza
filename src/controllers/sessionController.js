const bcrypt = require('bcrypt');
const Employee = require('../models/employeeModel');

class SessionController {
  async login(req, res) {
    try {
      const { nameEmployee: name, idEmployee: id } = req.body;

      if (name === ' ' || id === ' ') {
        return res.status(401)
          .json({ message: 'campos vazios' }).end();
      }
      const nameUpperCase = name.toUpperCase();
      const nameDataBase = await Employee.findOne({ nameEmployee: nameUpperCase });

      if (!nameDataBase) {
        return res.status(404)
          .json({ message: 'Nome do funcionário não encontrado' }).end();
      }
      if (!(bcrypt.compareSync(id, nameDataBase.idEmployee_hash))) {
        return res.status(401)
          .json({ message: 'senha inválida' }).end();
      }
      return res.status(200).json({ message: 'login realizado com sucesso' });
    } catch (error) {
      return console.error(`message: ${error}`).end();
    }
  }
}
module.exports = new SessionController();
