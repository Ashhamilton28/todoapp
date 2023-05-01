const express = require ('express')
const mongoose = require('mongoose')
const Cors = require('cors')
const dotenv = require('dotenv')
// require('dotenv').config
dotenv.config()

const {
getTodos, createTodo, updateTodo, deleteTodo,
} = require('./controllers/todoController')



// configuration
const app = express()
const PORT = process.env.PORT || 3001

const connectionURL = process.env.MONGO_URI

//middleware
app.use(express.json())
app.use(Cors())


//Get Todos
app.get('/todos', getTodos)

//Create Todos
app.post('/todos', createTodo)

//Update Todo
app.put('/todos/:id', updateTodo)

//delete Todo
app.delete('/todos/:id', deleteTodo)

// Tell the app to listen on port 3000
app.listen(3001, () => {
    console.log(`Server running on  port: ${PORT}`);
    mongoose.set('strictQuery', true)
    // connect to mongodDB
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB!')
    })
})