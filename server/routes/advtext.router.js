const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route -- sends the save data from the database for a particular user's current story.
 */
router.get('/:storyId', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log(req.params.storyId);
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
                SELECT "history" 
            FROM "baseMode_adventures"
            JOIN "story" ON "baseMode_adventures".story_id = "story".id
            JOIN "user" ON "story".user_id = "user".id
            WHERE "baseMode_adventures".story_id = $1;
                `
                pool.query(queryText, [req.params.storyId])
                    .then(result => {
                        res.send(result.rows[0]) // sends over the saveObject for the that player's story.
                    }).catch(err => {
                        console.log(err);
                        res.sendStatus(500)
                    })
            } else {
                res.sendStatus(403)
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
});

/**
 * POST route -- adds the base save data for a new story, which is specified in the req.body
 */
router.post('/:storyId', (req, res) => {
    let queryText = `
    SELECT "user".id FROM "user"
    JOIN story ON story.user_id = "user".id
    WHERE story.id = $1;
    `
    pool.query(queryText, [req.params.storyId])
        .then(result => {
            if (result.rows[0].id === req.user.id) {
                queryText = `
                INSERT INTO "baseMode_adventures" ("story_id", "history")
                VALUES ($1, $2);
                `
                console.log(queryText);
                pool.query(queryText, [req.params.storyId, JSON.stringify(req.body)])
                    .then(result => {
                        res.sendStatus(201)
                    }).catch(err => {
                        console.log(err);
                        res.sendStatus(500)
                    })
            } else {
                res.sendStatus(403)
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
});


/**
 * PUT route -- updates the save data to the new data object.
 */
router.put('/:storyId', rejectUnauthenticated, (req, res) => {
    // console.log(req.user);
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
                UPDATE "baseMode_adventures" SET "history" = $1
            WHERE story_id = $2;
                `
                pool.query(queryText, [JSON.stringify(req.body), req.params.storyId])
                    .then(result => {
                        res.sendStatus(201)
                    }).catch(err => {
                        console.log(err);
                        res.sendStatus(500)
                    })
            } else {
                res.sendStatus(403)
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

module.exports = router;
