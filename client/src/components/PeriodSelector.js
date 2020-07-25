import React, { useState, useEffect } from "react";

const PeriodSelector = ({period, selectPeriod}) => {
    const [periodList, setPeriodList] = useState([]);

    useEffect(() => {
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const list = [];

        const currentYear = new Date().getFullYear();

        [currentYear - 1, currentYear, currentYear + 1].forEach((year) => {
            months.forEach((month, index) => {
                list.push({
                    label: `${month}/${year}`,
                    value: `${year}-${(index + 1).toString().padStart(2, '0')}`,
                    month: index + 1,
                    year
                });
            })
        });
        
        setPeriodList(list);
    }, []);

    const nextPeriod = () => {
        const [ year, month ] = period.split('-').map((str) => parseInt(str));
        let newYear = 0;
        let newMonth = 0;
    
        if (parseInt(year) === (new Date().getFullYear() + 1)) {
            if (month === 12) {
                return;
            }
        }

        if (month === 12) {
            newMonth = '01';
            newYear = year + 1;
        } else {
            newMonth = (month + 1).toString().padStart(2, '0');
            newYear = year;
        }

        selectPeriod(`${newYear}-${newMonth}`);        
    }

    const previousPeriod = () => {
        const [ year, month ] = period.split('-').map((str) => parseInt(str));
        let newYear = 0;
        let newMonth = 0;
    
        if (parseInt(year) === (new Date().getFullYear() - 1)) {
            if (month === 1) {
                return;
            }
        }

        if (month === 1) {
            newMonth = '12';
            newYear = year - 1;
        } else {
            newMonth = (month - 1).toString().padStart(2, '0');
            newYear = year;
        }

        selectPeriod(`${newYear}-${newMonth}`);   
    }

    return (
        <div className="row center-align">
            <div className="col s4"/>

            <div className="col">
                <button disabled={period === `${new Date().getFullYear() - 1}-01`} className="waves-effect waves-light btn" 
                    onClick={() => previousPeriod()}
                    style={{zIndex: "0 !important"}}><i className="material-icons">chevron_left</i></button>
            </div>

            <div className="col s2">
                <select className="browser-default" value={period} onChange={(event) => selectPeriod(event.target.value)}>
                    {
                        periodList &&
                        periodList.map((period, index) => (
                            <option {...period} key={index} />
                        ))
                    }
                </select>
            </div>

            <div className="col">
                <button disabled={period === `${new Date().getFullYear() + 1}-12`}  className="waves-effect waves-light btn" 
                    onClick={() => nextPeriod()}
                    style={{zIndex: "0 !important"}}><i className="material-icons">chevron_right</i></button>
            </div>    
        </div >
    );
}

export default PeriodSelector;

/*

    const changePeriod = useCallback((newPeriod) => {
        setPeriod(newPeriod);
        selectPeriod(newPeriod);
    }, [selectPeriod]);

    useEffect(() => {
        changePeriod(getCurrentPeriod());

    }, [changePeriod]);
*/