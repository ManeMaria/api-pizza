const bcrypt = require('bcrypt');
const Employee = require('../models/employeeModel');

class EmployeeController {
  async create(req, res) {
    const dataValues = Object.values(req.body);
    try {
      if (dataValues.find((d) => d === ' ')) {
        return res.status(401).json({ message: 'dados inválidos' }).end();
      }
      const salt = bcrypt.genSaltSync(10);

      req.body.idEmployee_hash = bcrypt.hashSync(req.body.idEmployee, salt);
      req.body.nameEmployee = dataValues[0].toUpperCase();

      const newEmployee = new Employee(req.body);
      const registeredEmployee = await newEmployee.save();

      return res.status(200).json({
        message: 'funcionário cadastrado com sucesso',
        registeredEmployee,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'não é possível realizar o cadastro',
        error: `${err.message}`,
      });
    }
  }

  async searchForEmployee(req, res) {
    try {
      const { nameEmployee: name } = req.body;

      if (name === '' || typeof (name) !== 'string') {
        return res.status(401).json({ message: 'nome inválido' }).end();
      }

      const nameUpperCase = name.toUpperCase();
      const result = await Employee.findOne({ nameEmployee: nameUpperCase });

      if (result === null || result === undefined) {
        return res.status(404).json({ message: 'colaborador não encontrado' });
      }
      return res.status(200).json({ colaborador: result });
    } catch (err) {
      return res.status(500).json({ error: `${err.message}` });
    }
  }

  async listAllEmployees(req, res) {
    try {
      const result = await Employee.find({});
      return res.status(200).json({ colaboradores: result });
    } catch (err) {
      return res.status(500).json({ error: `${err.message}` });
    }
  }

  async updateEmployee(req, res) {
    const data = req.body;
    const dataArray = Object.values(data);

    if (data.nameEmployee) {
      const nameUpperCase = data.nameEmployee.toUpperCase();
      data.nameEmployee = nameUpperCase;
    }

    if (data.idEmployee) {
      const salt = bcrypt.genSaltSync(10);
      data.idEmployee_hash = bcrypt.hashSync(data.idEmployee, salt);
    }

    try {
      if (dataArray.includes(' ')) {
        return res.status(401).json({ message: 'os campos vazio' }).end();
      }

      const result = await Employee.findByIdAndUpdate(
        req.params.id,
        data,
        {
          new: true,
        },
      );
      console.log(result);
      if (!result) {
        return res.status(404).json({ message: 'colaborador não encontrado' }).end();
      }
      return res.status(200).json({
        message: 'colaborador atualizado com sucesso!',
        colaborador: result,
      }).end();
    } catch (err) {
      if (err.kind === 'objectId') {
        return res.status(404)
          .json({
            message: 'erro ao encontrar o funcinário(a)',
            error: err.message,
          }).end();
      }
      res.status(404).json({
        massage: 'id não encontrado',
        error: err.message,
      });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const { nameEmployee: name } = req.body;

      if (name === '' || typeof (name) !== 'string') {
        return res.status(401).json({ message: 'nome inválido' }).end();
      }

      const nameUpperCase = name.toUpperCase();
      const result = await Employee.findOneAndDelete({ nameEmployee: nameUpperCase });

      if (result === null || result === undefined) {
        return res.status(404).json({ message: 'colaborador não encontrado' });
      }
      return res.status(200).json({ message: `colaborador ${name} deletado com sucesso` });
    } catch (err) {
      return res.status(500).json({ error: `${err.message}` });
    }
  }
}

module.exports = new EmployeeController();
