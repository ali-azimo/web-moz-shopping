const {User} = require('../model/modelUser');
const express = require('express');
const router = express.Router();


router.get(`/`, async(req, res) => {
    const orderList = await User.find();
    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
})
module.exports = router;