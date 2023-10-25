require('dotenv').config()
const express = require('express')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

//const PORT = process.env.PORT
const { PORT } = process.env

const app = express()
app.use(express.json())

const observacoesPorLembreteId = {}

/*
    "1": [
        {"id": 100, "texto": "oi", "idLembrete": 1},
        {"id": 101, "texto": "tchau", "idLembrete": 1}
    ],
    "2": [
        {"id": 102, "texto": "sim", "idLembrete": 2},
        {"id": 103, "texto": "não", "idLembrete": 2}
    ]
*/

//GET /lembretes/1/observacoes
app.get('/lembretes/:id/observacoes', (req, res) => {
  res.send(observacoesPorLembreteId[req.params.id] || [])
})

//POST /lembretes/1/observacoes {texto: "Fazer café"}
app.post('/lembretes/:id/observacoes', (req, res) => {
  //1. Gerar um uuid (Identificador)
  const idObs = uuidv4()
  //2. Extrair o texto da observação do corpo da requisição
  //3. Seria o mesmo que: const texto = req.body.texto
  const { texto } = req.body
  //3. Pegar o id do lembrete envolvido na operação
  const { idLembrete } = req.params.id
  //4. Das duas uma: pegar a coleção de observação já associada a esse lembrete ou, se ainda não houver uma, criar uma
  const observacoesDoLembrete = observacoesPorLembreteId[idLembrete] || []
  //5. Adicionar uma observação a essa coleção, composta pelo texto extraído do corpo da requisição e pelo id gerado via uuid
  observacoesDoLembrete.push({ id: idObs, texto: texto })
  //6. Atualizar a base para que ela referencie a potencialmente nova coleção
  observacoesPorLembreteId[idLembrete] = observacoesDoLembrete
  //7. Responder ao cliente com código 201 Created, que tudo deu certo
  res.status(201).send(observacoesDoLembrete)
})

app.listen(PORT, () => {
  console.log(`Observações: ${PORT}`)
})
