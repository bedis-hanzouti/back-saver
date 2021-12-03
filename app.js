const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
// const mongoose = require('mongoose');


const hostname = '127.0.0.1';
const port = 3000;


const mongoose = require("mongoose");

let dev_db_url = "mongodb+srv://platinum:platinum2022@platinum.qdpvp.mongodb.net/platinum?retryWrites=true&w=majority";
// let dev_db_url = "mongodb+srv://RootDB:root@restapi.ii97j.mongodb.net/nawedi?retryWrites=true&w=majority";

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(
    mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
    },
    (err) => {
        if (err) console.log("Error during mongoose connection: " + err);
        else {
            console.log("Successful mongoose connection.");
        }
    }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));



app.use(express.json());
app.use(cors())

app.use('/user', require('./routes/userRoute'));

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});