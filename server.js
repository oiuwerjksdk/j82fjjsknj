const axios = require('axios')
const express = require('express')
const app = express()
let db = [
  "krissone",
  "sabrinajadex",
  "nicole_anistonn",
  "bad__princess",
  "devyale",
  "belle_emmanuelle",
  "sabi_wii",
  "tastypoint",
  "_mariarty_",
  "nadeen_",
  "ellediane",
  "kim_red_"
]


app.get('/', (req, res) => routeIndex(req, res))
app.get('/db', (req, res) => res.send(db))
app.get('/add', (req, res) => routeAdd(req, res))
app.get('/remove', (req, res) => routeRemove(req, res))


app.listen(3000, () => console.log(`Server is running on port 3000...`))


function routeIndex(req, res) {
  let html = ''
  db.forEach(el => {
    html +=
      `<img src="https://jpeg.live.mmcdn.com/stream?room=${el}&f=${Math.random()}" alt="${el}" width="280" height="160" onclick="window.open('https://chaturbate.com/${el}','_blank', 'noopener,noreferrer')">`
  })
  res.send(html)
}


function routeAdd(req, res) {
  db.unshift(req.query.name)
  res.send('added')
}


function routeRemove(req, res) {
  db = db.filter(el => el !== req.query.name)
  res.send('removed')
}


setInterval(function() {
  axios('https://slivchina.onrender.com/')
    .then(res => res)
    .catch(err => err)
}, 24892)


setInterval(function() {
  axios('https://slivchina.onrender.com/')
    .then(res => res)
    .catch(err => err)
}, 85738)