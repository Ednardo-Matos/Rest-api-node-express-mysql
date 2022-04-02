const express = require('express'); // importando express
const consign = require('consign'); //importando consign
const bodyParser = require('body-parser'); //importando bodyparser


module.exports = () =>{
    const app = express();

    app.use(bodyParser.urlencoded({extends:true}));//user biblioteca padrão do express, então o app.use(tem que usar o urlencoded com o valor extends:true)
    app.use(bodyParser.json()); //da mesma forma no formato json


    consign()
        .include('controllers')//incluindo todos os modulos de controllers  em (app)
        .into(app)

        return app; //retorna o app pra função
}



