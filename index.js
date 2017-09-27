'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var winston = require('winston');

require('dotenv').load();

const rp = require('request-promise');
// app.use('/', express.static('public'));
// app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// app.listen(app.get('port'), function() {
// 	console.log("Online ")
// })


var port = Number(process.env.PORT || 5001); 
app.listen(port, function() { console.log("Listening on " + port); })

const MONGO_ACCESS     = process.env.MONGO_ACCESS;
const fs = require('fs');
const env = process.env.DEBUG_LEVEL
console.log(env)
const logDir = 'log'; 
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: env
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-results.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env 
    })
  ]
});



logger.debug('Debugging info');

logger.info('Hello world');

logger.error('Error info');



var mongoose = require('mongoose');
mongoose.Promise = global.Promise 
mongoose.connect(MONGO_ACCESS, function(err) {

   if (err) logger.error('err - level error', 'Conectando ao mongodb!', {  
            someKey: err 
          });
   else console.log('Online');
});


var Schema = mongoose.Schema;



//################################################################//
//################################################################//
//################################################################//
//################################################################//

var Schema = mongoose.Schema;  
var usuariosSchema = new Schema({
cod_user: String,
senha:String,
username:String

}, {collection: 'usuarios'});

app.post('/usuariosid', (req, res) =>{

  var usuariosProcess = req.body
  var usuariosDb = mongoose.model('usuariosDb', usuariosSchema);
      console.log(" BANCO vouchersUSERS #############")
      console.log(usuariosProcess)
      console.log(" BANCO vouchersUSERS #############")

      usuariosDb
          .findOne({"cod_user": usuariosProcess.cod_user },
              function(err, result) {
                console.log(usuariosProcess.cod_user)
                console.log(result)
                if(usuariosProcess.cod_user == ""){
                    var vazio = "código vazio"
                    res.send(vazio)
                    // console.log(result)
                    // res.send(false);
                } else if(usuariosProcess.cod_user.length != 9)
                    {
                        var menor = "código maior ou menor que 9 dígitos"
                        res.send(menor)
                    } else {
                    if(!result){
                        console.log("erro resultado ->"+result)
                        res.send(false);
                    } else {
                        var resposta = {
                            "result" : usuariosProcess.cod_user,
                            "status" : true 
                        };
                        res.send(resposta);
                    }
                }
              });
});

//  chamada senha

app.post('/senha', (req, res) =>{
    
      var usuariosProcess = req.body
      var usuariosDb = mongoose.model('usuariosDb', usuariosSchema);
          console.log(" BANCO vouchersUSERS #############")
          console.log(usuariosProcess)
          console.log(" BANCO vouchersUSERS #############")
    
          usuariosDb
              .find({   
                  "cod_user": usuariosProcess.cod_user,
                  "senha": usuariosProcess.senha 
                },
                  function(err, result) {
                    console.log(usuariosProcess.senha)
                    console.log(result)
                    if(
                        (usuariosProcess.senha == "" && 
                        usuariosProcess.cod_user == "")||
                        usuariosProcess.cod_user == ""||
                        usuariosProcess.senha == ""
                    ){
                        var vazio = "vazio"
                        res.send(vazio)
                        // console.log(result)
                        // res.send(false);
                    } else if(
                            usuariosProcess.senha.length != 6 ||
                            usuariosProcess.cod_user.length != 9 ||
                            (usuariosProcess.cod_user.length != 9 &&
                            usuariosProcess.senha.length != 6))
                        {
                            var menor = "senha ou código de usuário maior ou menor que exigido"
                            res.send(menor)
                        } else {
                        if(err){
                            console.log(err)
                            res.send(err);
                        } else {
                            var resposta = {
                                "usuario" : result[0].username,
                                "status" : true 
                            };
                            res.send(resposta);
                        }
                    }
                  });
    });
    


app.post('/geral', (req, res) =>{

var usuariosProcess = req.body


var usuariosDb = mongoose.model('usuariosDb', usuariosSchema);
  console.log(" BANCO vouchersUSERS #############")
  console.log(usuariosProcess)
  console.log(" BANCO vouchersUSERS #############")

  usuariosDb
          .find(
              function(err, result) {
              if (err) res.send(err);
              console.log(err)
                  logger.info("#### Consultando saldo desse ID #####" )
                  console.log(result)    
                  res.send(result)
                     
              });
});