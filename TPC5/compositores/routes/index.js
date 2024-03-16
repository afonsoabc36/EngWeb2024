var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get(['/','/compositores'], (req, res, next) => {
  axios.get('http://localhost:3000/compositores?_sort=nome')
  .then(resp => {
      compositores = resp.data;
      res.render('listaCompositores', { title: 'Compositores', compositores: compositores });
  })
  .catch(erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter a lista de compositores"});
  });
});

/* GET writer page. */
router.get(/\/compositores\/C[0-9]+/, (req, res, next) => {
  axios.get('http://localhost:3000' + req.url)
  .then(resp => {
      compositor = resp.data;
      res.render('paginaCompositor', { title: `${compositor.nome}`, writer: compositor });
  })
  .catch(erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter a página do compositor"});
  });
});

/* GET new writer form page. */
router.get('/compositores/registo', (req, res, next) => {
  res.render('registoCompositor', { title: 'Adicionar compositor' });
});

/* GET edit writer form page. */
router.get(/\/compositores\/edit\/C[0-9]+/, (req, res, next) => {
  writerID = req.url.split('/')[3];
  axios.get('http://localhost:3000/compositores/' + writerID)
  .then(resp => {
      compositor = resp.data;
      res.render('editarCompositor', { title: `Editar compositor`, writer: compositor });
  })
  .catch(erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do compositor"});
  });
});

/* GET delete writer page. */
router.get(/\/compositores\/delete\/C[0-9]+/, (req, res, next) => {
  idCompositor = req.url.split('/')[3];
  axios.delete('http://localhost:3000/compositores/' + idCompositor)
  .then( resp => {
    res.redirect('/compositores');
  })
  .catch( erro => {
    res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do compositor " + idCompositor});
  });
});

/* GET period list page. */
router.get('/periodos', (req, res, next) => {
  axios.get('http://localhost:3000/periodos?_sort=nome')
  .then( resp => {
      periodos = resp.data;
      res.render('listaPeriodos', { title: 'Períodos', periodos: periodos });
  })
  .catch( erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter a lista de períodos" });
  });
});

/* GET new period form page. */
router.get('/periodos/registo', (req, res, next) => {
  res.render('registoPeriodo', { title: 'Adicionar período' });
});

/* GET period page. */
router.get(/\/periodos\/edit\/P[0-9]+/, (req, res, next) => {
  idPeriodo = req.url.split('/')[3];
  axios.get('http://localhost:3000/periodos/' + idPeriodo)
  .then( resp => {
      periodo = resp.data;
      res.render('editarPeriodo', { title: `Editar período`, periodo: periodo});
  })
  .catch( erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do período " + idPeriodo});
  });
});

/* GET delete period page. */
router.get(/\/periodos\/delete\/P[0-9]+/, (req, res, next) => {
  idPeriodo = req.url.split('/')[3];
  axios.delete('http://localhost:3000/periodos/' + idPeriodo)
  .then( resp => {
    res.redirect('/periodos');
  })
  .catch( erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do período " + idPeriodo});
  });
});

/* POST new writer form page */
router.post('/compositores/registo', (req, res ,next) => {
  result = req.body;
  axios.post("http://localhost:3000/compositores", result)
  .then( resp => {
    res.status(201).redirect('/compositores');
  })
  .catch(err => {
    res.render('error', { title: 'Erro', error: err, message: "Não foi possível adicionar as informações do periodo" })
  });
});

/* POST edit writer form page */
router.post(/\/compositores\/edit\/C[0-9]+/, (req, res ,next) => {
  result = req.body;
  compositor = req.url.split('/')[3];
  axios.put("http://localhost:3000/compositores/" + compositor, result)
  .then( resp => {
    res.status(201).redirect('/compositores/' + compositor);
  })
  .catch(err => {
    res.render('error', { title: 'Erro', error: err, message: "Não foi possível atualizar as informações do compositor" })
  });
});

/* POST new period form page */
router.post('/periodos/registo', (req, res ,next) => {
  result = req.body;
  axios.post("http://localhost:3000/periodos/", result)
  .then( resp => {
    res.status(201).redirect('/periodos');
  })
  .catch(err => {
    res.render('error', { title: 'Erro', error: err, message: "Não foi possível adicionar as informações do periodo" })
  });
});

/* POST edit writer form page */
router.post(/\/periodos\/edit\/P[0-9]+/, (req, res ,next) => {
  result = req.body;
  axios.put("http://localhost:3000/periodos/" + result.id, result)
  .then( resp => {
    res.status(201).redirect('/periodos/' + result.nome);
  })
  .catch(err => {
    res.render('error', { title: 'Erro', error: err, message: "Não foi possível atualizar as informações do periodo" })
  });
});

/* GET period page. */
router.get(/\/periodos\/[A-Za-z]+/, (req, res, next) => {
  nome = req.url.split('/')[2]
  axios.get('http://localhost:3000/compositores?periodo=' + nome)
  .then( resp => {
      compositores = resp.data;
      res.render('paginaPeriodo', { title: `${nome}`, compositores: compositores, periodo: nome});
  })
  .catch( erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do período " + nome});
  });
});


module.exports = router;