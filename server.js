const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')



//dotenv connection
dotenv.config();

//mongo connection
connectDB();

//app object
const app = express();

//middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white)
})