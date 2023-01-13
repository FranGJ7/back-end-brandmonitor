//configurações iniciais
const express = require('express')
const mongoose = require('mongoose')
const app = express()



//Metodo de leitura do json
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


//rotas
const personRoutes = require("./routes/PersonRoutes")
app.use("/person", personRoutes)




app.get('/', (req, res)=>{


   res.json({message: 'Oi'})
})










//Porta entregue
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://brand-monitor:JKlDbMPpPAUPlSaz@cluster0.q2wdxwg.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{ console.log('Connection succesfull')
 app.listen(3000)})
.catch((error) => console.log(error," Erro na conexão com Banco de dados"));

