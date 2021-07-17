const base = require('path').dirname(require.resolve(__dirname))
const buildPath = base+'/client/build'
const publicPath = base+'/client/public'
const indexFile = buildPath+'/index.html'
let port = parseInt(process.env.Port || process.env.PORT || 3000) + 1
const express = require('express');
const app = express()
let protocol = 'http'
let server = require(protocol).createServer(app).listen(port)
let host = 'localhost'

function serverUrl() {
  if (server) {
      let addy = server.address().address
      host = (addy !== '::') ? addy : 'localhost'
      port = server.address().port
  }
  return `${protocol}://${host}:${port}`
}

app.get('/',(req,res,next) => {
  res.sendFile(indexFile)
})

app.use(express.static(buildPath))
app.use(express.static(publicPath))

const DOM = require('jsdom').JSDOM

return new Promise(resolve => {

  let jsdOptions = {
    url: serverUrl(),
    runScripts: "dangerously",
    resources: "usable",
    beforeParse: (win) => {
      win.addEventListener('DOMContentLoaded', () => {
        let html = win.document.documentElement.outerHTML
        require('fs').writeFileSync(indexFile,html)
        server.close()
        resolve(html)
      })
    }
  }

  let html = require('fs').readFileSync(indexFile)
  let theDom = new DOM(html,jsdOptions)

})
