const path = require('path')
const fs = require('fs')
const base = path.dirname(require.resolve(__dirname))
const publicPath = base+'/client/public'
const buildPath = base+'/client/build'
const indexFile = buildPath+'/index.html'
let port = process.env.Port || process.env.PORT || 3001
let protocol = port === 443 ? 'https' : 'http'
const express = require('express');
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const app = express()
const server = require(protocol).createServer(app)
let listeningApp

app.get('/',async (req,res,next) => {
  res.sendFile(indexFile)
})

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  }
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
})

app.get('/hello',(req,res,next) => {
  let html = `<h1>Hello, IMS!</h1><h1 id="text"></h1>
  <script>
    let timestamp = new Date().getTime();
    document.getElementById("text").innerHTML = timestamp
  </script>`
  res.send(html)
})

app.get('*', (req, res) => {
  let ret = () => { 
    res.sendFile(indexFile); return true 
  }
  [buildPath,publicPath].some(pth => {
    if (fs.existsSync(pth+req.url)) {
      ret = () => res.sendFile(pth+req.url)
      return true
    }
  })
  ret()
})

app.use(express.static(publicPath))
app.use(express.static(buildPath))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

listeningApp = server.listen(port, function(error) {
  if (error) throw error;
  console.log('listening on *:' + port);
});