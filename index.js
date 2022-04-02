const customExpress = require('./config/customExpress')// importando customExpress
const port = 3000;// porta do servidor
const app = customExpress();//atribuindo customExpress ao app

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});

