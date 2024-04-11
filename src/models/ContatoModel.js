const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function(){
  this.cleanUp();
  // Validar contato
  // Email precisa ser válido
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
  if(!this.body.name) this.errors.push('Nome é um campo obrigatório.');
  if(!this.body.email && !this.body.phone){
    this.errors.push('É necessário informar ao menos um dos dois campos: Email ou telefone.');
  }
};

Contato.prototype.cleanUp = function(){
  for(const key in this.body){
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    name: this.body.name,
    lastname: this.body.lastname,
    email: this.body.email,
    phone: this.body.phone
  };
};

Contato.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos - sem acesso ao this
Contato.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
};

Contato.buscaContatos = async function() {
  const contatos = await ContatoModel.find()
  .sort({ criadoEm: 1 }); // Ordenando os contatos por ordem decrescente (1 para ordem crescente e -1 para ordem decrescente)
  return contatos;
};

Contato.delete = async function(id) {
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findOneAndDelete({_id: id});
  return contato;
};

module.exports = Contato;
