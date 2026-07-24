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
let follow = []
let follow2 = []

app.get('/', (req, res) => routeIndex(req, res))
app.get('/db', (req, res) => res.send(db))
app.get('/fl', (req, res) => res.send(follow))
app.get('/fl2', (req, res) => res.send(follow2))
app.get('/add', (req, res) => routeAdd(req, res))
app.get('/remove', (req, res) => routeRemove(req, res))
app.get('/follow', (req, res) => routeFollow(req, res))
app.get('/unfollow', (req, res) => routeUnfollow(req, res))


app.listen(3000, () => console.log(`Server is running on port 3000...`))
iterate()
setTimeout(iterate2, 3000)

function routeIndex(req, res) {
  let html = ''
  db.forEach(el => {
    html +=
      `<img src="https://jpeg.live.mmcdn.com/stream?room=${el}&f=${Math.random()}" alt="${el}" width="280" height="160" onclick="window.open('https://chaturbate.com/${el}','_blank', 'noopener,noreferrer')">`
  })
  res.send(html)
}


function routeAdd(req, res) {
  if (!db.includes(req.query.name)) {
    db.unshift(req.query.name)
  } else {

  }
  res.send('added')
}


function routeRemove(req, res) {
  db = db.filter(el => el !== req.query.name)
  follow = follow.filter(el => el !== req.query.name)
  follow2 = follow2.filter(el => el !== req.query.name)
  res.send('removed :(')
}


function routeFollow(req, res) {
  if (!follow.includes(req.query.name) && !follow2.includes(req.query.name)) {
    follow.unshift(req.query.name)
    db.unshift(req.query.name)
  }
  res.send('followed')
}


function routeUnfollow(req, res) {
  follow = follow.filter(el => el !== req.query.name)
  follow2 = follow2.filter(el => el !== req.query.name)
  res.send('unfollowed :(')
}


function iterate() {
  let index = 0
  follow.length ? check() : setTimeout(iterate, 1000)

  async function check() {
    if (index < follow.length) {
      const res = await axios(`https://jpeg.live.mmcdn.com/stream?room=${follow[index]}&f=${Math.random()}`, {
        signal: AbortSignal.timeout(4000)
      })
      console.log(follow[index], res.status)
      if (res.status == 200) {
        // console.log('mock notify about', follow[index])
        sendMaileroo('sobelotokuche@protonmail.com', `${follow[index]} is online`, `${follow[index]} is online:
https://chaturbate.com/${follow[index]}`)
        follow2.unshift(follow[index])
        follow = follow.filter(el => el !== follow[index])
      }
      index++
      setTimeout(check, 1000)
    } else {
      iterate()
    }
  }
}


function iterate2() {
  let index = 0
  follow2.length ? check() : setTimeout(iterate2, 1000)

  async function check() {
    if (index < follow2.length) {
      const res = await axios(`https://jpeg.live.mmcdn.com/stream?room=${follow2[index]}&f=${Math.random()}`, {
        signal: AbortSignal.timeout(4000)
      })
      console.log(follow2[index], res.status)
      if (res.status !== 200) {
        console.log('went offline ', follow2[index])
        follow.unshift(follow2[index])
        follow2 = follow2.filter(el => el !== follow2[index])
      }
      index++
      setTimeout(check, 3000)
    } else {
      iterate2()
    }
  }
}


function sendMaileroo(to, subject, plain) {
  const config = {
    "from": {
      "address": "slivchina@c9c7843d277b40a0.maileroo.org",
      "display_name": "slivchina.onrender.com"
    },
    "to": [{
      "address": to
    }],
    "subject": subject,
    "plain": plain
  }
  axios.post('https://smtp.maileroo.com/api/v2/emails', config, {
      signal: AbortSignal.timeout(4000),
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": '723eb9048e7d19db5c183b8ac4145304a6d36b5b9a79a48e9a7de516d0ed72e3'
      }
    })
    .then(res => console.log(res.status, 'maileroo OK'))
    .catch(err => console.log(err, 'maileroo ERR'))
}


setInterval(function() {
  axios('https://slivchina.onrender.com/')
    .then(res => res)
    .catch(err => err)
}, 345920)


setInterval(function() {
  axios('https://slivchina.onrender.com/')
    .then(res => res)
    .catch(err => err)
}, 656940)