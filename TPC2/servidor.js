var http = require('http');
var axios = require('axios');

http.createServer((req, res) => {
    console.log(req.url);
    
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})

    if (req.url === '/') {
        res.write("<h1>Escola de Música</h1>");
        res.write("<br>");
        res.write("<h4><a href='/alunos'>Alunos</a></h4>");
        res.write("<h4><a href='/cursos'>Cursos</a></h4>");
        
        res.end();
    } else if (req.url === '/alunos') {
        axios.get("http://localhost:17001/alunos")
        .then((response) => {
            var data = response.data;

            res.write("<h2>Alunos</h2>");
            res.write("<br>");

            for (i in data) {
                res.write("<p><b>Nome: </b>" + data[i].nome + "</p>");
                res.write("<p><b>ID: </b>" + data[i].id + "</p>");
                res.write("<p><b>Data de nascimento: </b>" + data[i].dataNasc + "</p>");
                res.write("<p><b>Curso: </b><a href='/cursos/" + data[i].curso + "'>" + data[i].curso + "</a>"+ "</p>");
                res.write("<p><b>Ano curso: </b>" + data[i].anoCurso + "</p>");
                res.write("<p><b>Instrumento: </b>" + data[i].instrumento + "</p>");
                res.write("<hr />");
            }

            res.end();
        })
        .catch((err) => {
            res.write("Error: " + err.message);
            res.end();
        });
    } else if (req.url === '/cursos') {
        axios.get("http://localhost:17001/cursos?_sort=designacao")
        .then((response) => {
            var data = response.data;
            console.log(data);

            res.write("<h2>Cursos</h2>");
            res.write("<br>");

            for (i in data) {
                res.write("<p><b>Designação: </b><a href='/cursos/" + data[i].id + "'>" + data[i].designacao + "</a></p>");
                res.write("<p><b>ID: </b>" + data[i].id + "</p>");
                res.write("<p><b>Duração: </b>" + data[i].duracao + " anos</p>");
                res.write("<p><b>Instrumento: </b>" + data[i].instrumento["#text"] + "</p>");
                res.write("<hr />");
            }

            res.end();
        })
        .catch((err) => {
            res.write("Error: " + err.message);
            res.end();
        });
    } else if (req.url.match(/\/cursos\/C[A-Z][0-9]+/)) {
        axios.get("http://localhost:17001" + req.url)
        .then((response) => {
            data = response.data;

            res.write("<h1>" + data.designacao + "</h1>");
            res.write("<br>");
            res.write("<p><b>ID: </b>" + data.id + "</p>");
            res.write("<p><b>Duração: </b>" + data.duracao + " anos</p>");
            res.write("<p><b>Instrumento: </b>" + data.instrumento["#text"] + "</p>");
            res.write("<br>");
            res.write("<h5><a href='/cursos'>Voltar aos cursos</a></h5>")

            res.end();
        })  
        .catch((error) => {
            res.write("Error: " + error.message);
            res.end();
        });
    } else {
        res.write("Error 404: Page not found")
        res.end();
    }
}).listen(2002);

console.log('Servidor à espera de conexões na porta 2002')
