'use strict'

const express = require('express')

const { PORT = '3000' } = process.env
const app = express()

app.use((req, res, next) => {
  console.log('llamado... loco... exito')
  res.send('Hello Seba 5')
})

app.listen(PORT)
