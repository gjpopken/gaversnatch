const express = require('express');
const getInitialSave = require('../modules/initialSave')
const roomTemplate = require('../modules/roomTemplate')
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', async (req, res) => {
    const result = await getInitialSave(roomTemplate)
    res.send(result)
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
