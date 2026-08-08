const axios = require('axios')
const express = require('express')
const app = express()
let db = [
  "emmaandjake",
  "erohaze",
  "brittnirehberger",
  "tinyangelxx",
  "miladystarlight",
  "adelia_ntmu",
  "wow_peach_girl",
  "rosevanessa",
  "miarouss3",
  "mya_gold",
  "antonella_silva",
  "tntluvs",
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
  "kim_red_",
]
let follow = []
let follow2 = []

app.get('/', (req, res) => routeIndex(req, res))
app.get('/db', (req, res) => res.send(db))
app.get('/fl', (req, res) => res.send(follow))
app.get('/fl2', (req, res) => res.send(follow2))
app.get('/follow', (req, res) => routeFollow(req, res))
app.get('/unfollow', (req, res) => routeUnfollow(req, res))
app.get('/add', (req, res) => routeAdd(req, res))
app.get('/remove', (req, res) => routeRemove(req, res))


app.listen(3000, () => console.log(`Server is running on port 3000...`))


iterate()
setTimeout(iterate2, 5000)


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
  if (!follow.includes(req.query.name) && !follow2.includes(req.query.name)) { follow.unshift(req.query.name) }
  res.send('followed')
}


function routeUnfollow(req, res) {
  follow = follow.filter(el => el !== req.query.name)
  follow2 = follow2.filter(el => el !== req.query.name)
  res.send('unfollowed :(')
}


function iterate() {
  let index = 0
  let arr = [...follow]
  arr.length ? check() : setTimeout(iterate, 1000)

  async function check() {
    if (index == arr.length) {
      iterate()
      return
    }

    let slivche = arr[index]
    index++
    setTimeout(check, 1000 * 10)
    try {
      const res = await axios(`https://jpeg.live.mmcdn.com/stream?room=${slivche}&f=${Math.random()}`, {
        signal: AbortSignal.timeout(4000)
      })
      console.log(slivche, res.status)
      if (res.status == 200) {
        // console.log('mock notify about', slivche)
        sendMaileroo('sobelotokuche@protonmail.com', `${slivche} is online`, `${slivche} is online:
https://chaturbate.com/${slivche}`)
        db.includes(slivche) ? follow2.unshift(slivche) : 0
        follow = follow.filter(el => el !== slivche)
      }
    } catch (err) { console.log(err.message, slivche) }
  }
}


function iterate2() {
  let index = 0
  let arr = [...follow2]
  arr.length ? check() : setTimeout(iterate2, 1000)

  async function check() {
    if (index == arr.length) {
      iterate2()
      return
    }
    let slivche = arr[index]
    index++
    setTimeout(check, 1000 * 60 * 5)
    try {
      const res = await axios(`https://jpeg.live.mmcdn.com/stream?room=${slivche}&f=${Math.random()}`, {
        signal: AbortSignal.timeout(4000)
      })
      console.log(slivche, res.status)
      if (res.status !== 200) {
        follow.unshift(slivche)
        follow2 = follow2.filter(el => el !== slivche)
      }
    } catch (err) { console.log(err.message, slivche) }
  }
}


function sendMaileroo(to, subject, plain) {
  const config = {
    "from": {
      "address": "slivchina@546efd10e8c3419e.maileroo.org",
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
        "X-Api-Key": '096308984c35ee8ed28cb5c34ecd5d34f71ce1fb522d1cf282d064e9ec9cab6f'
      }
    })
    .then(res => console.log(res.status, 'maileroo OK'))
    .catch(err => console.log(err, 'maileroo ERR'))
}


setInterval(function() {
  axios('https://slivchina.onrender.com/fl')
    .then(res => res)
    .catch(err => err)
}, 459388)


setInterval(function() {
  axios('https://slivchina.onrender.com/fl2')
    .then(res => res)
    .catch(err => err)
}, 735938)