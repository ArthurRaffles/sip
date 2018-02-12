var express = require('express');
var router = express.Router();

let instruments = [
    { ric: 'BP' },
    { ric: 'BT' },
    { ric: 'BARC' }
]
router.get('/', (req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(instruments);
    // res.send(JSON.stringify(instruments));
});

router.post('/add', (req: any, res: any) => {
    console.warn('req body', req.body, req.headers);
    instruments = req.body;
    res.end();
    // console.warn(JSON.parse(req));
   // res.send(JSON.stringify(instruments));
})

module.exports = router;
