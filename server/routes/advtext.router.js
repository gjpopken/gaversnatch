const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

router.put('/:storyId', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    let queryText = `
    SELECT "user".id FROM "user"
JOIN story ON story.user_id = "user".id
JOIN "baseMode_adventures" ON "baseMode_adventures".story_id = story.id
WHERE story.id = $1;
    `
    pool.query(queryText, [req.params.storyId])
        .then(result => {
            if (result.rows[0].id === req.user.id) {
                queryText = `
                UPDATE "baseMode_adventures" SET "history" = '${JSON.stringify(req.body)}'
            WHERE story_id = $1;
                `
                console.log(queryText);
                pool.query(queryText, [req.params.storyId])
                .then(result => {
                    res.sendStatus(201)
                }).catch(err => {
                    console.log(err);
                    res.sendStatus(500)
                })
            } else {
                res.sendStatus(403)
            }
            // res.send(result.rows)
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

module.exports = router;
