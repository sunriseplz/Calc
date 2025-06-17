import React, {useState} from 'react';

import {addCalc} from "./../functions.js";

import Message from './Message.js';

function AddCalc(props){
    return (
        <div className='form-add'>
            <h2>Добавить Калькулятор</h2>

            <Message statusMessage={ props.statusMessage }/>

            <div className="form">
                <div className="input">
                    <input type="text" placeholder="Название калькулятора " id="calcName" />
                </div>
                <div className="input">
                    <input type="text" placeholder="Годовая ставка" id="rateYear" />
                </div>
                <div className="input">
                    <button onClick={ () => addCalc( props ) } className="button">Сохранить</button>
                </div>
            </div>
        </div>
    );
}

export default AddCalc;