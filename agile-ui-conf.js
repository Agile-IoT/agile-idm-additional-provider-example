module.exports = {
	"gateway_id":"1",
   "token-storage":{
      "dbName":"./database_web",
      "createTables":true
   },
   "auth":{
   },
   "tls":{
      "key":"./certs/server.key",
      "cert":"./certs/server.crt"
   },
   "http_port":3000,
   "https_port":1444,
   "https_port_with_client":1443,
     //"enabledStrategies":["agile-local","github","google","webid","my-demo"]
    "enabledStrategies":["agile-local","my-demo"]
}
