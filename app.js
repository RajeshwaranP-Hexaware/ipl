'use strict';

const express = require('express');
const app = express()

app.post('/', (req, res) => {
    console.log('REQUSST', JSON.stringify(req.body));
    return res.json({statusCode:200});
});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 3000!'));