const express = require('express');
const errorMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());

const product = require('./routes/productRoute')
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);


// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;
