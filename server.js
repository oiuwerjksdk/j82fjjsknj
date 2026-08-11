const axios = require('axios')
const express = require('express')
const app = express()
let followed = []
let girls = ["alexxisrae", "inspire4sex", "vivid_girls", "splendid_dolls", "jjennnyy", "_eva_queen", "anny54784", "malenkiykamen", "emmaandjake", "erohaze", "brittnirehberger", "tinyangelxx", "miladystarlight", "adelia_ntmu", "wow_peach_girl", "miarouss3", "mya_gold", "antonella_silva", "tntluvs", "krissone", "sabrinajadex", "nicole_anistonn", "bad__princess", "devyale", "belle_emmanuelle", "sabi_wii", "tastypoint", "_mariarty_", "nadeen_", "ellediane", "kim_red_"]


app.get('/', (req, res) => routeIndex(req, res))
app.get('/girls', (req, res) => res.send(girls))
app.get('/followed', (req, res) => res.send(followed))
app.get('/add', (req, res) => routeAdd(req, res))
app.get('/remove', (req, res) => routeRemove(req, res))
app.get('/follow', (req, res) => routeFollow(req, res))
app.get('/unfollow', (req, res) => routeUnfollow(req, res))

app.listen(3000, () => {
  console.log(`Server is running on port 3000...`)
  iterate()
})


function routeIndex(req, res) {
  let html = ''
  girls.forEach(el => {
    html +=
      `<img src="https://jpeg.live.mmcdn.com/stream?room=${el}&f=${Math.random()}" alt="${el}" width="280" height="160" onclick="window.open('https://chaturbate.com/${el}','_blank', 'noopener,noreferrer')">`
  })
  res.send(html)
}


function routeAdd(req, res) {
  if (!girls.includes(req.query.name)) {
    girls.unshift(req.query.name)
  }
  res.send('added')
}


function routeRemove(req, res) {
  girls = girls.filter(el => el !== req.query.name)
  res.send('removed :(')
}


function routeFollow(req, res) {
  !followed.includes(req.query.name) ? followed.unshift(req.query.name) : 0
  res.send('followed')
}


function routeUnfollow(req, res) {
  followed = followed.filter(el => el !== req.query.name)
  res.send('unfollowed :(')
}


function iterate() {
  let index = 0
  let arr = [...followed]
  arr.length ? check() : setTimeout(iterate, 1000)

  async function check() {
    if (index == arr.length) {
      iterate()
      return
    }

    let girl = arr[index]
    index++
    setTimeout(check, 1000 * 10)
    try {
      const res = await axios(`https://jpeg.live.mmcdn.com/stream?room=${girl}&f=${Math.random()}`, {
        signal: AbortSignal.timeout(4000)
      })
      console.log(girl, res.status)
      if (res.status == 200) {
        // console.log('mock notify about', girl)
        sendMaileroo('sobelotokuche@protonmail.com', `${girl} is online`, `${girl} is online:
https://chaturbate.com/${girl}`)
        followed = followed.filter(el => el !== girl)
      }
    } catch (err) { console.log(err.message, girl) }
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
}, 528909)


setInterval(function() {
  axios('https://slivchina.onrender.com/fl2')
    .then(res => res)
    .catch(err => err)
}, 726381)