const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
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

router.post('/inventory/:storyId', rejectUnauthenticated, async (req, res) => {
    // expecting req.body to be an array of item_ids. 

    const connection = await pool.connect()
    try {
        connection.query("BEGIN")
        let queryText = `
    SELECT "user".id FROM "user"
    JOIN story ON story.user_id = "user".id
    WHERE story.id = $1;
    `
        const result = await connection.query(queryText, [req.params.storyId])
        if (result.rows[0].id === req.user.id) {
            queryText = `
            INSERT INTO inventory ("story_id", "item_id", "quantity")
            VALUES ($1, $2, $3);
            `
            for (let item_id of req.body) {
                await connection.query(queryText, [req.params.storyId, item_id, 1])
            }
            await connection.query("COMMIT")
            res.sendStatus(201)
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        await connection.query("ROLLBACK")
        console.log(error);
        res.sendStatus(500)
    } finally {
        connection.release()
    }
})

module.exports = router;
