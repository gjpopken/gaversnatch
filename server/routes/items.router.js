const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // console.log('in the get router for items');
    // GET route code here
    const queryText = `
SELECT * FROM "items";
`
    pool.query(queryText)
        .then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
});


module.exports = router;
