const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    // DB에서 favorite 숫자 가져오기
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) res.status(400).send(err)
            // 프론트에 다시 숫자 정보 보내기
            res.status(200).json({ success: true, favoriteNumber: info.length })
        })
})

router.post('/favorited', (req, res) => {
    // 리스트에 해당 영화를 넣었는지에 대한 정보를 DB에서 갖져오기
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if (err) res.status(400).send(err)

            let result = false;
            if (info.length !== 0) result = true;
            res.status(200).json({ success: true, favorited: result })
        })
})

router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if (err) res.status(400).send(err)
        res.status(200).json({ success: true, doc })
    })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })
})

router.post('/getFavoredMovie', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, doc) => {
            if (err) res.status(400).send(err)
            res.status(200).json({ success: true, favorites: doc })
        })
})

module.exports = router;
