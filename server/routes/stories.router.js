const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT id, story_name FROM story
    WHERE story.user_id = $1;
  `
    pool.query(queryText, [req.user.id])
    .then(result => {
        // console.log(result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const queryText = `
    INSERT INTO "story" ("story_name", "user_id")
    VALUES
    ($1, $2)
    RETURNING id;
    `
    pool.query(queryText, [req.body.story_name, req.user.id])
    .then(result => {
        console.log(result);
        res.send(result.rows[0])
    }).catch(err => {
        console.log(err);
    })
});

router.delete('/:storyId', rejectUnauthenticated, (req, res) => {
    let queryText = `
    SELECT "user".id FROM "user"
    JOIN story ON story.user_id = "user".id
    WHERE story.id = $1;
    `
    pool.query(queryText, [req.params.storyId])
    .then(result => {
        if (result.rows[0].id === req.user.id) {
            console.log("This is allowed");
            queryText = `
            DELETE FROM "story"
            WHERE id = $1
            `
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
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
})

module.exports = router;
