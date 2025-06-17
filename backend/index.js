const PORT = 9001
const dbUrl = 'mongodb://127.0.0.1:27017/calc_db'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jsonwebtoke = require('jsonwebtoken')

// Подключаем модели
const User = require('./models/User')
const Calculator = require('./models/Calculator')

// Настраиваем сервер
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Генерация токена
const {secret} = require('./config')

const getToken = (id) => {
    const payLoad = {id}
    return jsonwebtoke.sign(payLoad, secret, {expiresIn: '24h'})
}

// Авторизация
app.post('/autho', async (req, res) => {
    const {login, password} = req.body
    const userItem = await User.findOne({login: login})
    let message = 'Вы успешно вошли!'
    let token = ''

    if (login == 'admin' && !userItem){
        const userItem = new User({
            login: login,
            password: password,
            role: 'administrator',
        })

        await userItem.save()
        token = getToken(userItem._id)
    } else if (!userItem || userItem.password != password){
        message = 'Логин или пароль неверные!'
    } else {
        token = getToken(userItem._id)
    }

    res.json({
        status: (token) ? 'ok' : 'no',
        token: token,
        message: message,
    })
})

// Добавляет калькулятор
app.post('/addCalc', async (req, res) => {
    const {calcName, rateYear} = req.body
    let itemNew;

    if (calcName && rateYear){
        const calcItem = new Calculator({
            name: calcName,
            rateYear: rateYear,
        })

        itemNew = await calcItem.save()
    }

    res.json({
        status: (itemNew) ? 'ok' : 'no',
        message: (itemNew) ? 'Калькулятор добавлен!' : 'Калькулятор не добавлен!',
    })
})

// Обновляет калькулятор
app.post('/updateCalc', async (req, res) => {
    const {calcId, calcName, calcStatus, rateYear} = req.body
    let item;

    if (calcId && calcName && rateYear){
        item = await Calculator.updateOne({_id : calcId}, {$set: {name: calcName, rateYear: rateYear, status: calcStatus}})
        console.log(item)
    }

    res.json({
        status: (item) ? 'ok' : 'no',
        message: (item) ? 'Калькулятор обновлен!' : 'Калькулятор не обновлен!',
    })
})

// Обновляет статус для калькулятора
app.post('/updateStatusCalc', async (req, res) => {
    const {calcId, calcStatus} = req.body
    let item;

    const status = (calcStatus) ? true : false;

    if (calcId){
        item = await Calculator.updateOne({_id : calcId}, {$set: {status : status}})
    }

    res.json({
        status: (item) ? 'ok' : 'no',
    })
})

// Получает список всех калькуляторов
app.get('/listCalcs', async (req, res) => {
    const calculators = await Calculator.find()

    res.json({
        status: 'ok',
        data: calculators,
    })
})

// Удаление калькулятора
app.post('/deleteCalc', async (req, res) => {
    const {calcId} = req.body
    let item;

    if (calcId){
        item = await Calculator.deleteOne({_id : calcId})
        console.log(item)
    }

    res.json({
        status: (item) ? 'ok' : 'no',
    })
})

// Запускаем сервер
const start = async () => {
    try {
        await mongoose.connect(dbUrl, {authSource: 'admin'})

        app.listen(PORT, () => {
            console.log(`server start ${PORT}`)
        })
    } catch (e){
        console.log(e)
    }
}

start()