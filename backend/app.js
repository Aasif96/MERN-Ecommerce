const express = require('express');
const errorMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

const product = require('./routes/productRoute')
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);


// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;
