const base = require('path').dirname(require.resolve(__dirname))
const buildPath = base+'/client/build'
const publicPath = base+'/client/public'
const indexFile = buildPath+'/index.html'
let port = parseInt(process.env.PORT || 3001) + 1
const express = require('express');
const app = express()
let protocol = 'http'
const serverUrl = require('./utils/serverUrl.js')

app.get('/',(req,res) => {
  res.sendFile(indexFile)
})

app.use(express.static(buildPath))
app.use(express.static(publicPath))

const DOM = require('jsdom').JSDOM
const JSD = require('jsdom')
const VC = JSD.VirtualConsole
const virtualConsole = new VC()

const server = require(protocol).createServer(app).listen(port,() => {
    
    return new Promise(resolve => {

      let jsdOptions = {
        url: serverUrl(server),
        virtualConsole: virtualConsole,
        runScripts: "dangerously",
        resources: "usable",
        beforeParse: (win) => {

          win.addEventListener('DOMContentLoaded', () => {
            let html = win.document.documentElement.outerHTML
            require('fs').writeFileSync(indexFile,html)
            server.close()
            console.log('New HTML has been rendered.')
            resolve(html)
            process.exit()
          })

        }
      }
      const html = require('fs').readFileSync(indexFile)
      const theDom = new DOM(html,jsdOptions)
    })

})

return