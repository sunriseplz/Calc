import React from 'react';

import {autho} from './../functions.js';

import Message from './Message.js';

function Login(props){
    return (
        <div className="login">
            <h2>Вход в админ</h2>

            <Message statusMessage={ props.statusMessage } />

            <div className="input">
                <input type="text" placeholder="Логин" id="login" />
            </div>
            <div className="input">
                <input type="password" placeholder="Пароль" id="password" />
            </div>
            <div className="input">
                <button onClick={ () => autho(props) } className="button">Войти</button>
            </div>
        </div>
    );
}

export default Login;