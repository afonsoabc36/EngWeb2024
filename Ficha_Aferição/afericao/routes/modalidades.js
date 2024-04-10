var express = require('express');
var router = express.Router();
var Person = require('../controllers/people');

/* GET home page. */
router.get('/', function(req, res, next) {
    Person.distinct("desportos")
        .then( data => {
            res.jsonp(data);
        })
        .catch (err => {
            res.status(500).jsonp(err);
        })
});

/* GET modalidade players. */
router.get('/:nomeModalidade', function(req, res, next) {
    Person.sport(req.params.nomeModalidade)
        .then( data => {
            res.jsonp(data);
        })
        .catch (err => {
            res.status(501).jsonp(err);
        })
});

module.exports = router;