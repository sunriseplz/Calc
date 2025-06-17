import React, {useState} from 'react';

import {updateCalc} from "./../functions.js";

function EditCalc(props){
    const [isChecked, setIsChecked] = useState(props.calcStatus);
    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className='form-edit' id={ props.calcId }>
            <div className="input calc-name">
                <input type="text" defaultValue={ props.calcName } placeholder="Название калькулятора" data-key="calcName" />
            </div>
            <div className="input rate-year">
                <input type="text" defaultValue={ props.rateYear } placeholder="Годовая ставка" data-key="rateYear" />
            </div>
            <div className="input calc-status">
                <input type="checkbox" checked={ isChecked } onChange={ handleChange } data-key="calcStatus" />
            </div>
            <div className="input button-edit">
                <button onClick={ () => updateCalc( props ) } className="button">Сохранить</button>
            </div>
        </div>
    );
}

export default EditCalc;