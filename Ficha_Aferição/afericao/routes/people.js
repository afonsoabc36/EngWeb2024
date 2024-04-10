var express = require('express');
var router = express.Router();
var Person = require('../controllers/people');

/* GET home page. */
router.get('/', function(req, res, next) {
  Person.list()
      .then(data => {
        res.jsonp(data);
      })
      .catch(err => {
        res.status(500).jsonp(err);
      });
});

router.get('/:bicc', function(req, res, next) {  
  Person.get(req.params.bicc)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(505).jsonp(err);
    });
});

router.post('/', function(req, res, next) {
  Person.insert(req.body)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(501).jsonp(err);
    });
});

router.put('/:bicc', function(req, res, next) {
  Person.update(req.params.bicc, req.body)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(502).jsonp(err);
    });
});

router.delete('/:bicc', function(req, res, next) {
  Person.delete(req.params.bicc)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(503).jsonp(err);
    });
});


module.exports = router;
