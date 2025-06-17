// URl Server
const apiUrl = 'http://localhost:9001';

// Авторизация пользователя
export const autho = (props) => {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const data = {
        login: login,
        password: password
    };

    fetch(`${apiUrl}/autho`, {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
    })
    .then(resurlt => resurlt.json())
    .then((resurlt) => {
        console.log(resurlt)
        if (resurlt.status == 'ok'){
            setCoockeAutho(resurlt.token);
            props.setPage('Calculators');
        } else {
            document.getElementById('message').innerHTML = resurlt.message;
            props.setStatusMessage('fade')
        }
    });
}

// Выполняет расчет
export const calculator = () => {
    const year = 12;

    const rateYear = parseFloat(document.getElementById('rateYear').value);
    const numberYeas = parseFloat(document.getElementById('numberYeas').value);
    const neededAmount = parseFloat(document.getElementById('neededAmount').value);

    // Расчитываем общую ставку
    const rateMonth = rateYear / year / 100;
    const totalMonths = numberYeas * year;
    const rateGeneral = Math.pow(1 + rateMonth, totalMonths);
    
    // Расчитываем ежемесячный платеж
    const payMonth = neededAmount * rateMonth * rateGeneral / (rateGeneral - 1);
    
    // Необходимый доход (в месяц)
    const requiredIncome = payMonth * 2.5;
    
    // Общая сумма (которую нужно выплатить)
    const totalPay = payMonth * numberYeas * year;

    document.getElementById('payMonth').innerHTML = payMonth.toFixed(2);
    document.getElementById('requiredIncome').innerHTML = requiredIncome.toFixed(2);
    document.getElementById('totalPay').innerHTML = totalPay.toFixed(2);
    
    return false;
}

// Добавляет новый калькулятор в БД
export const addCalc = (props) => {
    const calcName = document.getElementById('calcName').value;
    const rateYear = document.getElementById('rateYear').value;
    const data = {
        calcName: calcName,
        rateYear: rateYear
    };

    fetch(`${apiUrl}/addCalc`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     })
     .then(resurlt => resurlt.json())
     .then((resurlt) => {
        document.getElementById('calcName').value = '';
        document.getElementById('rateYear').value = '';
        document.getElementById('message').innerHTML = resurlt.message;

        props.setStatusMessage('fade');

        listCalculators(props.setCalculators);
     }); 
}

//
export const updateCalc = (props) => {
    const formEdit = document.getElementById(props.calcId);
    let data = { calcId: props.calcId };
    let status;

    for (let input of formEdit.childNodes) {
        const field = input.childNodes[0];
        const fieldKey = field.getAttribute('data-key');

        if (field.type == 'text'){
            data[fieldKey] = field.value;

        } else if (field.type == 'checkbox'){
            data[fieldKey] = field.checked;
            status = (field.checked) ? 'checked' : 'noCechked';
        }
    }

    fetch(`${apiUrl}/updateCalc`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     })
     .then(resurlt => resurlt.json())
     .then((resurlt) => {
       /* document.getElementById('calcName').value = '';
        document.getElementById('rateYear').value = '';
        document.getElementById('message').innerHTML = resurlt.message;*/

        listCalculators(props.setCalculators);
        props.handleSettingsViewCalc();
        props.setStatusCalc(status);
     });
}

// Получает список калькуляторов из БД
export const listCalculators = (setCalculators) => {
    fetch(`${apiUrl}/listCalcs`, {
        method: 'GET',
        headers: {
         'Content-Type': 'application/json'
        }
    })
    .then(resurlt => resurlt.json())
    .then((resurlt) => {
        // Получаем активные калькуляторы
        setCalculators(resurlt.data);
    })
}

// Обновляет статус калькулятора
export const updateStatusCalc = (calcId, statusChoosed, setStatusCalc) => {
    const calcStatus = (statusChoosed == 'checked') ? false : true;
    const data = {
        calcId: calcId,
        calcStatus: calcStatus
    }

    fetch(`${apiUrl}/updateStatusCalc`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     })
     .then(resurlt => resurlt.json())
     .then((resurlt) => {
        const status = (calcStatus) ? 'checked' : 'noCechked';
        setStatusCalc(status);
     }); 
}

// Удаляет калькулятор из БД
export const deleteCalc = (calcId, props) => {
    const data = {
        calcId: calcId,
    }

    fetch(`${apiUrl}/deleteCalc`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     })
     .then(resurlt => resurlt.json())
     .then((resurlt) => {
        //if (resurlt.status)
        listCalculators(props.setCalculators);
    }); 
}

// 
export const getCalculatorsActive = (calculators) => {
    const calculatorsActive = calculators.filter((item) => item.status == true);
    return calculatorsActive;
}

// Устанавливает куки об авторизации
export const setCoockeAutho = (token) => {
    let toDate = new Date();
    let minutes = toDate.getMinutes();
    let minutesNew = minutes + 60;

    toDate.setMinutes(minutesNew);

    document.cookie = "autho=1;expires=" + toDate.toString();
}

// Получает куки об авторизации
export const getCoockeAutho = () => {
    let results = document.cookie.match(/autho=(.+?)(;|$)/);

    if (results !== null && results.length > 0)
        return results[1];

    return false;
}

// Проверяет, есть авторизация или нет
export const isAutho = () => {
    const autho = getCoockeAutho();

    if (autho == 1)
        return true;
    else
        return false;
}

// Удаляет куки об авторизации (выход)
export const exit = (props) => {
    document.cookie = "autho=0;";
    props.setPage('Login');
    window.location.reload(true);
}