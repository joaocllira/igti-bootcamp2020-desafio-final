import React, { useState, useEffect } from "react";
import style, { colors } from "../style/main";

const InfoResume = ({transactions}) => {
    const [ lancamentos, setLancamentos ] = useState(0);
    const [ receitas, setReceitas ] = useState(0);
    const [ despesas, setDespesas ] = useState(0);
    const [ saldo, setSaldo ] = useState(0);

    useEffect(() => {
        console.log("trs", transactions)
        if (transactions) setLancamentos(transactions.length)
        else setLancamentos(0);
    }, [transactions]);

    useEffect(() => {
        if (transactions) {
            let total = transactions.reduce((acc, trns) => {
                return trns.type === '+' ? 
                    acc + trns.value : 
                    acc
            }, 0);
            setReceitas(total);            
        } else setReceitas(0);
    }, [transactions]);

    useEffect(() => {
        if (transactions) {
            let total = transactions.reduce((acc, trns) => {
                return trns.type === '-' ? 
                    acc + trns.value : 
                    acc
            }, 0);
            setDespesas(total);  
        } else setDespesas(0);
    }, [transactions]);

    useEffect(() => {
        setSaldo(receitas - despesas);
    }, [receitas, despesas]);

    return (
        <div style={style.infoResume}>
            <div className="row valign-wrapper" style={style.itemRow}>
                <div className="col s3">
                    <strong style={{marginRight: "5px"}}>Lançamentos:</strong>
                    {lancamentos}
                </div>
                
                <div className="col s3">
                    <strong style={{marginRight: "5px"}}>Receitas:</strong>
                    <span style={{color: colors.strongGreen}}>{`R$ ${receitas.toFixed(2)}`}</span>
                </div>
                
                <div className="col s3">
                    <strong style={{marginRight: "5px"}}>Despesas:</strong>
                    <span style={{color: colors.strongRed}}>{`R$ ${despesas.toFixed(2)}`}</span>
                </div>
                
                <div className="col s3">
                    <strong style={{marginRight: "5px"}}>Saldo:</strong>
                    <span style={{color: (saldo >= 0 ? colors.strongGreen : colors.strongRed)}}>{`R$ ${saldo.toFixed(2)}`}</span>
                </div>
            </div>
        </div>
    );
}

export default InfoResume;