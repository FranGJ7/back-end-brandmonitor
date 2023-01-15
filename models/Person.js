const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    confirmpassword: {
        type: String,
        required: true,
        minlength: 8
    },
    dateOfBirth: {
        type: Date,
        required: true
      },
    gender: {
        type: String,
        enum: ['masculino', 'feminino', 'não informado']
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

PersonSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password', 'confirmpassword')) {
        user.password = await bcrypt.hash(user.password, 10)
        user.confirmpassword = await bcrypt.hash(user.confirmpassword, 10)
    }
    next()
})






const Person = mongoose.model('Person', PersonSchema)
module.exports = Person
