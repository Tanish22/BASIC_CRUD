const express = require("express");
const app = express();

const {config} = require('dotenv');
config();

const db = require('./db/db')

const userRoutes = require('./routes/userRoutes')

const PORT = process.env.PORT;

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})  