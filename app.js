const express = require('express');

const app = express();

const questionsApi = require('./app_api/routes/questions');
const path = require('path');

require('./app_api/models/db');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use('/api', questionsApi);

app.listen(5000);
module.exports = {
    app
}
