import React from "react";

import {calculator} from "./../functions.js";


function CalcForm(props){
    return (
        <div className="calc">
            <div className="form">
                <div className="form-items">
                    <h2>{ props.calcName }</h2>

                    <div className="input">
                        <input type="text" placeholder="Годовая ставка" value={ props.rateYear } id="rateYear" disabled />
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Нужна сумма " id="neededAmount" />
                    </div>
                    <div className="input">
                        <input type="number" placeholder="Срок кридита в месяцах " id="numberYeas" />
                    </div>

                    <div className="input">
                        <button onClick={ () => calculator() } className="button">Рассчитать</button>
                    </div>
                </div>
            </div>

            <div className="calculation">
                <div className="information">
                    <div className="row">
                        <div className="label">Ежемесячный платеж:</div>
                        <div className="value">
                            <span id="payMonth">0</span>
                            <span> руб.</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">Необходимый доход в месяц:</div>
                        <div className="value">
                            <span id="requiredIncome">0</span>
                            <span> руб.</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">Общая сумма выплаты:</div>
                        <div className="value">
                            <span id="totalPay">0</span>
                            <span> руб.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalcForm;