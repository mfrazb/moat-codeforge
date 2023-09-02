const path = require('path');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));






app.use((req, res) => res.status(404).send('Oops! This is not the right page'));

app.use((err, req, res, next) =>{
    const defaultError = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' }, 
    };
    const errorObj = Object.assign({},defaultError, err);
    console.log(errorObj.log);
    res.status(errorObj.status).send(errorObj.message);
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });

    module.exports = app;