import React, { useState } from "react";

const TransactionInput = ({filter, openModal}) => {
    const [filtroInput, setFiltroInput] = useState('');

    return (
            <div className="row valign-wrapper" style={{marginTop: "15px"}}>
                <div className="col s3">
                    <button className="waves-effect waves-light btn" style={{textTransform: "uppercase", zIndex: "0 !important"}}
                        onClick={openModal}
                    >
                        <span>+ Novo Lançamento</span>
                    </button>
                </div>
                <div className="input-field col s9">
                    <input id="filtroInput" type="text" value={filtroInput} className="validate"
                        onChange={(event) => {
                            const input = event.target.value;
                            setFiltroInput(input);
                            filter(input);
                        }} />
                    <label htmlFor="filtroInput">Filtrar lançamentos por descrição</label>
                </div>
            </div>
    );
}

export default TransactionInput;