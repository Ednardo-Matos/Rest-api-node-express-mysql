const customExpress = require('./config/customExpress')// importando customExpress
const port = 3000;
const conexao = require('./infraestrutura/conexao');//importando a conexão
const tabelas = require('./infraestrutura/tabelas');

conexao.connect(erro => {
    if(erro){
        console.log(erro);

    }else {
        console.log("Banco conectado com sucesso");

        tabelas.init(conexao)

        const app = customExpress();//atribuindo customExpress ao app
        
        app.listen(port, () => {
            console.log(`Servidor rodando na porta: ${port}`);
        });
        
    }
});


