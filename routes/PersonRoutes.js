const router = require('express').Router()

//const { Router } = require('express')
//import dos models
const Person = require('../models/Person')

//Criando cadastro
router.post('/', async (req, res) => {

    //req.body
    const { name, email, password, gender } = req.body

    const person = {
        name,
        email,
        password,
        gender,
    }

    //Criando dado no banco
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
            res.status(422).json({ message: "Usuário não encontrado!" })
            return
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


module.exports = router