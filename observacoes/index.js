require('dotenv').config()
const express = require('express')
const axios = require('axios')

const app = express()
const { PORT } = process.env.PORT

app.use(express.json())

//GET /lembretes/id/observacoes
app.get('/lembretes/:id/observacoes', (req, res) => {

})

//POST /lembretes/id/observacoes
app.post('lembretes/:id/observacoes', (req, res) => {

})


app.listen(PORT, () => {
    console.log(`Observacoes: ${PORT}`)
})