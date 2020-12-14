const express = require('express')

const router = express.Router()

// @route POST api/profile
// @desc Profile routes
// @access Public

router.post('/', (req, res) => {
    console.log(req.body)
    res.send('Profile route')
})

module.exports = router