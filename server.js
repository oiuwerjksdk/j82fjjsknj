const fs = require('fs')
const axios = require('axios')
const express = require('express')
const app = express()
let database = require('./database.json')


app.get('/', (req, res) => routeIndex(req, res))
app.get('/add', (req, res) => routeAdd(req, res))
app.get('/remove', (req, res) => routeRemove(req, res))
app.get('/database', (req, res) => res.send(database))


app.listen(3000, () => {
  update()
  console.log(`Server is running on port 3000...`)
})


function update() {
  axios('https://???.onrender.com/database')
    .then(res => {
      fs.writeFileSync('./database.json', JSON.stringify(res.data))
    })
    .catch(err => console.log(err.code))
}


function routeIndex(req, res) {
  let html = ''
  database.forEach(el => {
    html +=
      `<img src="https://jpeg.live.mmcdn.com/stream?room=${el}&f=${Math.random()}" alt="${el}" width="280" height="160" onclick="window.open('https://chaturbate.com/${el}','_blank', 'noopener,noreferrer')">`
  })
  res.send(html)
}


function routeAdd(req, res) {
  database.unshift(req.query.name)
  fs.writeFileSync('./database.json', JSON.stringify([...new Set(database)]))
  res.send('added')
}


function routeRemove(req, res) {
  database = database.filter(el => el !== req.query.name)
  fs.writeFileSync('./database.json', JSON.stringify(database))
  res.send('removed')
}


setInterval(function() {
  axios('https://???.onrender.com/')
    .then(res => res)
    .catch(err => err)
}, 33000)


setInterval(function() {
  axios('https://???.onrender.com/')
    .then(res => res)
    .catch(err => err)
}, 81000)