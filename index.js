//configurações iniciais
const { response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//import dos models
const Person = require('./models/Person')

//Metodo de leitura do json
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


//rotas

app.post('/person', async(req, res)=>{
      
    //req.body
     const {name, email, password, gender} = req.body
    
     const person = {
        name,
        email,
        password,
        gender
     }
     
     //Criando dado no banco
     try{
        
        await Person.create(person)
        res.status(201).json({message: "Usuário cadastrado com sucesso!"})

     }catch (error){
        res.status(500).json({error: error})
     }


 } )




app.get('/', (req, res)=>{


   res.json({message: 'Oi'})
})










//Porta entregue
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://brand-monitor:JKlDbMPpPAUPlSaz@cluster0.q2wdxwg.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{ console.log('Connection succesfull')
 app.listen(3000)})
.catch((error) => console.log(error," Erro na conexão com Banco de dados"));

