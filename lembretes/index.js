require('dotenv').config()
//usamos para definir endpoints
//para receber requisições http
const express = require('express')
//usamos para enviar requisições HTTP
const axios = require('axios')

const app = express();

app.use(express.json())

/*
    {
        "1": {"id": 1, "texto": "fazer cafe"}
        "2": {"id": 2, "texto": "ver filmes"}
    }
*/

const lembretes = {
}

//GET /lembretes
app.get('/lembretes', (req, res) => {
    res.send(lembretes)
})
//POST /lembretes {texto: "FAzer cafe"}
app.post('/lembretes', (req, res) => {
    const texto = req.body.texto
    const lembrete = {id, texto}
    lembretes[id] = lembrete
    id++
    res.status(201).send(lembrete)
})

app.listen(
    process.env.PORT,
    () => console.log(`Lembretes: ${process.env.PORT}`)
)