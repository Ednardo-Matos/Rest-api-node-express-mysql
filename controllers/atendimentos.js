
module.exports = app => {
    app.get('/atendimentos', (req, res) =>{
        res.send('Você esta na aba Atendimentos');
    });

    app.post('/atendimentos', (req, res) => {
        console.log(req.body);
        res.send("Você esta na rota de atendimento e esta realizando um post");
    });
}