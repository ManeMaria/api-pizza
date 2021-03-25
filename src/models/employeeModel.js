const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeeSchema = new Schema({
  nameEmployee: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  idEmployee: {
    type: String,
    required: true,
  },
  idEmployee_hash: {
    type: String,
  },
  /*
  * determinar o nível de acesso do colaborador no sistema
  * por enquanto só há dois níveis, que estão divididos em
  * true ou false. True para acesso total e false para alguns acessos
  */
  accessRestriction: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true, // diz o dia e a hora que o dado foi gravado
  collection: 'Employee',
});

module.exports = mongoose.model('Employee', employeeSchema);
