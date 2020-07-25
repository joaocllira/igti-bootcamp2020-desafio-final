const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
    try {
        const newTransaction = new TransactionModel({...req.body});

        const transaction = await newTransaction.save();

        if (!transaction) {
            res.json({ message: "Não foi possível criar Transação" });
            return;
        }

        res.json({ transaction });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro no servidor", error });
    }
};

const findAll = async (req, res) => {
    try {
        const { period } = req.query;
        const [ year, month ] = period ? period.split('-').map((str) => parseInt(str)) : [ -1, -1 ];

        const transactions = await TransactionModel.find(period ? { month, year } : {}).exec();

        if (!transactions || transactions.length === 0) {
            res.json({ message: "Não existem transações" });
            return;
        }

        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await TransactionModel.findById(id).exec();

        if (!transaction) {
            res.json({ message: "Transação não existe" });
            return;
        }

        res.json({ transaction });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params; 

        await TransactionModel.findByIdAndUpdate(id, { ...req.body }, { useFindAndModify: false }).exec();
        const transaction = await TransactionModel.findById(id).exec();

        if (!transaction) {
            res.json({ message: "Transação não existe" });
            return;
        }

        res.json({ transaction });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        
        await TransactionModel.findByIdAndDelete(id).exec();
        const transaction = await TransactionModel.findById(id).exec();

        if (transaction) {
            res.json({ message: "Erro ao deletar transação" });
            return;
        }

        res.json({ message: "Transação removida com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
};

const removeAll = async (req, res) => {
    try {
        await TransactionModel.deleteMany({}).exec();
        const transactions = await TransactionModel.find({}).exec();

        if (transactions && transactions.length > 0) {
            res.json({ message: "Erro ao deletar transações" });
            return;
        }

        res.json({ message: "Todas as transações foram removidas" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
};

module.exports = {
    create, findAll, findOne, update, remove, removeAll
}