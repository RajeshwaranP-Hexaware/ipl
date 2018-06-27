'use strict';

const express = require('express');
const app = express()

app.post('/', (req, res) => {
    console.log('REQUSST', JSON.stringify(req));
    return res.json({statusCode:200});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));