const express = require('express');
const getInitialSave = require('../modules/initialSave')
const roomTemplate = require('../modules/roomTemplate')
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route -- gets the object for the initial safe from a separate module.
 */
router.get('/', async (req, res) => {
    const result = await getInitialSave(roomTemplate)
    res.send(result)
});

module.exports = router;
