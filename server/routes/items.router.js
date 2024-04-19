const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route -- gets all items from the items table (these items are predetermined)
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


/**
 * GET route -- gets a player's current inventory from the inventory junction table.
 */
router.get('/inventory/:storyId', async (req, res) => {
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
            SELECT item_id, quantity, item_name, description FROM inventory
            JOIN items ON inventory.item_id = items.id
            WHERE story_id = $1;
            `

            const result2 = await connection.query(queryText, [req.params.storyId])
            await connection.query("COMMIT")
            res.send(result2.rows)
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


/**
 * POST route -- inserts new items a user has picked up into the inventory junction table
 */
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
