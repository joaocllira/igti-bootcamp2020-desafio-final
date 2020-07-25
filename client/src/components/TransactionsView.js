import React, { useState, useEffect, useCallback } from "react";

import PeriodSelector from "./PeriodSelector";
import InfoResume from "./InfoResume";
import TransactionInput from "./TransactionInput";
import TransactionList from "./TransactionList";

import { findAll, remove } from "../service/TransactionService";

import style from "../style/main";
import LancamentoModal from "./LancamentoModal";

const getCurrentPeriod = () => {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}


const TransactionsView = () => {    
    const [ transactions, setTransactions ] = useState([]);
    const [ filteredTransactions, setFilteredTransactions ] = useState([]);
    const [ period, setPeriod ] = useState(getCurrentPeriod());
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ editLancamento, setEditLancamento ] = useState(null);

    const fetch = useCallback(async () => {
        findAll(period).then((list) => setTransactions(list.transactions));
    }, [period]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    const applyFilter = (filter) => {
        const newList = transactions.filter((transaction) => transaction.description.includes(filter));
        setFilteredTransactions(newList);
    }

    return (
        <div style={style.transactionsView}>
            <PeriodSelector period={period} selectPeriod={(period) => setPeriod(period)} />

            <InfoResume transactions={filteredTransactions} />

            <TransactionInput openModal={() => setModalOpen(true)} filter={(filter) => applyFilter(filter)} />

            <TransactionList transactions={filteredTransactions} 
                edit={(lancamento) => {
                    setEditLancamento(lancamento);
                    setModalOpen(true);
                }} 
                remove={(id) => {
                    remove(id).then(() => {
                        fetch();
                    }).catch((error) => {
                        alert('Erro ao remover lançamento');
                    })
                }} 
            />

            <LancamentoModal lancamento={editLancamento} isModalOpen={modalOpen} 
                closeModal={() => {
                    fetch();
                    setEditLancamento(null);
                    setModalOpen(false)
                }} />
        </div>
    );
}

export default TransactionsView;