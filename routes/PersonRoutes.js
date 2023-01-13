const router = require('express').Router()

//import dos models
const Person = require('../models/Person')


router.post('/', async(req, res)=>{
      
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

 module.exports = router