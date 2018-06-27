'use strict';

const express = require('express');
const app = express()

app.post('/', (req, res) => {
    console.log('REQUSST', JSON.stringify(req));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));