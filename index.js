//configurações iniciais
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const jwt = require('jsonwebtoken')
const Person = require('./models/Person')
const bcrypt = require('bcrypt')
require('dotenv').config()

const cors = require('cors')

app.use(cors());



//Metodo de leitura do json
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())






//Rotas privada

app.get("/user/:id", checkToken, async(req, res)=>{

     const id = req.params.id
     
     //Checar se usuário existe
     const user = await Person.findById(id, '-password -confirmpassword')

     if(!user){
        return res.status(404).json({msg:"Usuário não encontrado"})
     }
     res.status(200).json({ user })

})
//checar token da rota protegida
function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ msg: "Acesso negado!" });
  
    try {
      const secret = process.env.SECRET;
  
      jwt.verify(token, secret);
  
      next();
    } catch (err) {
      res.status(400).json({ msg: "O Token é inválido!" });
    }
  }
  











//rotas
const personRoutes = require("./routes/PersonRoutes")
app.use("/person", personRoutes)




app.get('/', (req, res)=>{
   res.json({message: 'Oi'})
})



 
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
  
    // validations
    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório!" });
    }
  
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
  
    // check if user exists
    const user = await Person.findOne({email: email });
  
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
  
    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);
  
    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida" });
    }
  
    try {
      const secret = process.env.SECRET;
  
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
  
      res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
      console.log({token})
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  });

























//Porta entregue e conexão com mongoDB Atlas
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://brand-monitor:JKlDbMPpPAUPlSaz@cluster0.q2wdxwg.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{ console.log('Connection succesfull')
app.listen(process.env.PORT || 3000)})
.catch((error) => console.log(error," Erro na conexão com Banco de dados"));

