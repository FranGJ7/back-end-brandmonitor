const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

main().then(() => console.log('Connection succesfull'))
.catch((error) => console.log(error," Erro na conexão com Banco de dados"));

async function main() {
  await mongoose.connect('mongodb+srv://brand-monitor:JKlDbMPpPAUPlSaz@cluster0.q2wdxwg.mongodb.net/?retryWrites=true&w=majority');
}


