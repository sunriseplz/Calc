import React from 'react';

import {isAutho, exit} from "./../functions.js";

function Menu(props){
    const calculators = props.calculators.filter((item) => item.status == true);

   return (
        <div className='nav-menu'>
            { !isAutho() ? (
                <ul className='menu'>
                    {
                        calculators.map((item, index) => (
                            <li onClick={ () => props.setPage(`calculator_${index}`) }>{ item.name }</li>
                        ))
                    }

                    <li onClick={ () => props.setPage('Login') }>Войти</li>
                </ul>
            ) : (
                <ul className='menu'>
                    <li onClick={ () => props.setPage('Calculators') }>Калькуляторы</li>
                    <li onClick={ () => props.setPage('AddCalc') }>Добавить новый</li>
                    <li onClick={ () => exit(props) }>Выйти</li>
                </ul>
            )}
        </div>
    );
}

export default Menu;