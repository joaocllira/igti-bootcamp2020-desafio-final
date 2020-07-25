import React from 'react';

import style from "./style/main";
import TransactionsView from './components/TransactionsView';

export default function App() {
    return (
        <div className="container center">
            <h4 style={style.title}>Bootcamp Fullstack - Desafio Final</h4>
            <h5 style={style.subtitle}>Controle Financeiro Pessoal</h5>

            <TransactionsView />
        </div>
    );
}
