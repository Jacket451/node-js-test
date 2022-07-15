const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
require('dotenv').config()
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRouter = require('./routes/post-routes');
const postApiRouter = require('./routes/api-post-routes');
const contactRouter = require('./routes/contacts-routes');
const createPath = require('./helpers/create-path');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');

// const PORT = 3000;
// const db = 'mongodb+srv://Jacket:gjhjctyjr@nodejstest.quffmxm.mongodb.net/NodeJs?retryWrites=true&w=majority'



mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log(successMsg('Connected to db')))
    .catch((error) => console.log(errorMsg(error)));

app.listen(process.env.PORT, 'localhost', (error) => {
    error ? console.log(error(error)) : console.log(successMsg(`listening port ${process.env.PORT}`));
})

// morgan
// Теперь при переходе по страницам, мы видим: метод, статус, время ответа
app.use(express.urlencoded({ extended: false }))
// Обязательно прописывать перед routers

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static('styles'))

app.use(methodOverride('_method'));
// express блокирует статические файлы (если работает ejs), и их надо добавить в исключение данной коммандой

// middleware - функция, которая исполняется между сервером и возврата ему ответа браузером
// middleware обязательно должен следовать порядку записи (обязательно до создания роута с ответом)

app.get('/', (req, res) => {
    const title = "Home"
    res.render(createPath('index'), { title });
})



app.use(postRouter);
app.use(contactRouter);
app.use(postApiRouter);



app.get('/about-us', (req, res) => {
    res.redirect('contacts');
})

app.use((req, res) => {
    const title = "Error"
    res.statusCode = 404;
    res.render(createPath('error'), { title });
})

// Код ошибки должен обязательно писать в конце роута