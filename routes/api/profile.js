const express = require('express')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const router = express.Router()

// @route GET api/profile/me
// @desc Get current user profile
// @access Private

router.get('/me', auth, async (req, res) => {
    try {
        const id = req.user.id
        const profile = await Profile.findOne({ user: id }).populate('user', [
            'name', 'avatar'
        ])
        
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }

        res.json(profile)
    }catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route GET api/profile           
// @desc Create or update users profile
// @access Private

router.post('/', [
    auth, 
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
],  
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }  
})

module.exports = router