const moment = require('moment');
const atendimentos = require('../controllers/atendimentos');
const conexao = require('../infraestrutura/conexao');

class Atendimentos {
    adiciona(atendimento, res){ 
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser ser maior ou igual  a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres.'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);

        const existeErros = erros.length;
        if(existeErros){
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};

            const sql = 'INSERT INTO atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado,(erro, resultado) => {
                if(erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(atendimento);
                }
            })  
        }
    }

    lista(res){
        const sql  = 'SELECT * FROM atendimentos'
        conexao.query(sql, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM atendimentos where id= ${id}`

        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado[0]
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, res){
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const sql = `UPDATE atendimentos SET ? WHERE id=?`

        conexao.query(sql, [valores, id], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id=?`

        conexao.query(sql, id, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        })
    }



}

module.exports = new Atendimentos;