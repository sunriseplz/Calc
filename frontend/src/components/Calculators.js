import React from 'react';

import Calculator from './Calculator';

function Calculators(props){
    return (
        <div className='calculators'>
            <h2>Список калькуляторов</h2>

            <div className='list'>
                <div className="title">
                    <div className="item name">Название</div>
                    <div className="item rate-year">Годовая ставка</div>
                    <div className="item status">Статус</div>
                </div>

                {props.calculators.map((item, index) => (
                    <Calculator
                        index={index}
                        id={item._id}
                        key={item._id}
                        name={item.name}
                        rateYear={item.rateYear}
                        status={item.status}
                        setPage={ props.setPage }
                        setCalculators={ props.setCalculators }
                    />
                    ))
                }
            </div>
        </div>
    );
}

export default Calculators;