import React, {useState} from 'react';

import {updateStatusCalc, deleteCalc} from "./../functions.js";

import EditCalc from './EditCalc.js';

function Calculator(props){
    const statusKey =  (props.status) ? 'checked' : 'noCechked';

    // Состояние для статуса калькулятора (вкл/выкл)
    const [statusCalc, setStatusCalc] = useState(statusKey);
    const statusesCalc = {
        noCechked: 'no-checked',
        checked: 'checked'
    };

    // Состояние для полей редактирования калькулятора
    const [viewCalc, setViewCalc] = useState('hide');
    const viewsCalc = {
        hide: 'hide',
        fade: 'fade'
    };

    // Изменяет стояние для полей редактирования калькулятора
    const handleSettingsViewCalc = () => {
        let isView = (viewsCalc[viewCalc] == 'hide') ? 'fade' : 'hide';
        setViewCalc(isView);
    };

    return (
        <div className="calculator" id={ `calc_${props.id}` }>
            <div className="items">
                <div className="item name" >{ props.name }</div>

                <div className="item rate-year" >{ props.rateYear }</div>

                <div className="item status" >
                    <div className={ `checkbox ${statusesCalc[statusCalc]}` } onClick={ () => updateStatusCalc( props.id, statusesCalc[statusCalc], setStatusCalc ) }>
                        <div className="check"></div>
                    </div>
                </div>

                <div className="item options">
                    <div className="option button-option" onClick={ () => props.setPage(  `calculator_${props.index}` ) }>
                        <i className="fa fa-eye" title="Посмотреть" aria-hidden="true"></i>
                    </div>

                    <div className="option button-option" onClick={ () => handleSettingsViewCalc() }>
                        <i className="fa fa-pencil " title="Изменить" aria-hidden="true"></i>
                    </div>

                    <div className="option button-option" onClick={ () => deleteCalc( props.id, props ) }>
                        <i className="fa fa-trash"  title="Удалить" aria-hidden="true"></i>
                    </div>
                </div>
            </div>

            <div className={ `settings ${viewsCalc[viewCalc]}` }>
                <EditCalc 
                    key={ props.id }
                    calcId={ props.id }
                    calcName={ props.name }
                    rateYear={ props.rateYear }
                    calcStatus={ props.status }
                    setCalculators={ props.setCalculators }
                    setStatusCalc={ setStatusCalc }
                    handleSettingsViewCalc={ handleSettingsViewCalc }
                />
            </div>
        </div>
    );
}

export default Calculator;