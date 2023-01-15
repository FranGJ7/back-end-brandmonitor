const router = require('express').Router()
const jwt = require("jsonwebtoken");
//const { Router } = require('express')
//import dos models
const Person = require('../models/Person')

//Criando cadastro
router.post('/', async (req, res) => {

    //req.body
    const { name, email, password, confirmpassword, dateOfBirth, gender } = req.body

    const person = {
        name,
        email,
        password,
        confirmpassword,
        dateOfBirth,
        gender,
    }

    //Criando dado de usuário no MongoDB Atlas
    if(!name){
        return res.status(422).json({msg: "Campo de nome obrigatório!"})
    }
    if(!email){
        return res.status(422).json({msg: "Campo de Email obrigatório!"})
    }
    if(!password){
        return res.status(422).json({msg: "Senha obrigatório!"})
    }
    if(password !== confirmpassword){
        return res.status(422).json({msg: "As senhas não conferem!"})
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: "Usuário cadastrado com sucesso!" })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})



//Visualizar usuários
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(201).json(people)


    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Busca de um usuário específico
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            return res.status(422).json({ message: "Usuário não encontrado!" })
            
        }
        res.status(500).json({ person })

    } catch (error) {
        res.status(500).json({ error: error })

    }
})


//Atualização de dados de usuário
router.patch('/:id', async (req, res) => {
    const id = req.params.id


    const { name, email, password, gender } = req.body

    const person = {
        name,
        email,
        password,
        gender,
        updated_at: new Date()
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Deletar usuário
router.delete("/:id", async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: "Usuário não encontrado!" })
        return
    }

    try {

        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: "Usuário deletado com sucesso!" })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})


module.exports = router