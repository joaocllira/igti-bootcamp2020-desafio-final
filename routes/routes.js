const express = require('express');
const transactionRouter = express.Router();
const controller = require('../services/transactionService');

transactionRouter.post('/', controller.create);
transactionRouter.get('/', controller.findAll);
transactionRouter.get('/:id', controller.findOne);
transactionRouter.put('/:id', controller.update);
transactionRouter.delete('/:id', controller.remove);
transactionRouter.delete('/', controller.removeAll);

transactionRouter.get('/teste', (req, res) => {
    try {
        const { period } = req.query;

        if (!period) {
            res.status(400).json({ message: "É necessário informar o parâmetro \"period\", cujo valor deve estar no formato yyyy-mm" });
        }

        const [ano, mes] = period.split("-").map(num => parseInt(num));

        if (!ano || !mes) {
            res.status(400).json({ message: "Os valores de mês ou ano não estão num formato numérico" });
        }

        res.json({ message: "Requisição bem sucedida", ano, mes });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
});

module.exports = transactionRouter;
