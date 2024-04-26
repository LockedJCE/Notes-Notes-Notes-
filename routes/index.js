const router = require('express').Router();

const notesRoute = require('./notes');

router.use('/notes', notesRoute);

module.exports = router;