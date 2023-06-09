function serverUrl(server) {
  if (!server) return
  const addy = server.address().address
  host = (addy !== '::') ? addy : 'localhost'
  port = server.address().port
  const protocol = (port == 443) ? 'https' : 'http'
  
  return `${protocol}://${host}:${port}`
}
module.exports = serverUrl