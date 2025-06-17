import React, {useState, useEffect} from 'react';

import {isAutho, listCalculators} from "./../functions.js";

import Header from './Header';
import Content from './Content.js';
import Footer from './Footer';

import CalcForm from './CalcForm';
import Login from './Login';
import AddCalc from './AddCalc';
import Calculators from './Calculators';

function App() {
  // Состояние для списка калькуляторв
  const [calculators, setCalculators] = useState([]);
  const [calculatorsActive, setCalculatorsActive] = useState([]);

  // Полчает список калькуляторв из БД
  useEffect(() => {
      listCalculators(setCalculators, setCalculatorsActive);
  }, []);

  // Состояния для уведомлений
  const [statusMessage, setStatusMessage] = useState('hide');
  const classesStatusMessage = {
      hide: 'hide',
      fade: 'fade'
  };

  // Состояния для страниц
  const [page, setPage] = useState('Login');
  let pages = {
    Login: <Login setPage={ setPage } setStatusMessage={ setStatusMessage } statusMessage={ classesStatusMessage[statusMessage] } />,
    AddCalc: <AddCalc setCalculators={ setCalculators } setCalculatorsActive={ setCalculatorsActive } setStatusMessage={ setStatusMessage } statusMessage={ classesStatusMessage[statusMessage] } />,
    Calculators: <Calculators setPage={ setPage } calculators={ calculators } setCalculators={ setCalculators } setCalculatorsActive={ setCalculatorsActive } />

  };

  // Добавляем страницы для калькуляторов
  calculators.map((item, index) => (
    pages[`calculator_${index}`] = <CalcForm
        calcName={item.name}
        rateYear={item.rateYear} />
  ));

  return (
    <div className="wrapper">
      <Header setPage={ setPage } calculators={ calculators } />
      <Content page={ pages[page] } />
      <Footer />
    </div>
  );
}

export default App;
