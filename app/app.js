const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.options('*', cors())

//API config
require('dotenv/config');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Export router
const categRouter = require('./routers/routerCateg');
const prodRouter = require('./routers/routerProd');
const userRouter = require('./routers/routerUser');
const orderRouter = require('./routers/routerOrder');

const api = process.env.API_URL;

app.use(`${api}/categories`, categRouter);
app.use(`${api}/products`, prodRouter)
app.use(`${api}/users`, userRouter);
app.use(`${api}/order`, orderRouter);

mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'web-shopping'
}).then(() => {
    console.log('Database Connection is ready to be used...')
}).catch((err) => {
    console.log(err);
})


app.listen(3000, () => {
    console.log('Server is running http://localhost:3000');
})