---
title: TPC2
date: 2024-02-21
authorId: A100604
authorName: Afonso Oliveira e Silva
ucSigla: EW
ucNome: Engenharia Web
---

# TPC2

## Resultados
- Criação de uma página inicial com ligações para páginas secundárias
- Criação de páginas com dados retirados de uma API de dados
- Interligações entre as páginas criadas

## Compilar
**Terminal:** [^1]
```
json-server --port 17001 --watch db.json
```
```
node servidor.js
```
**Browser:**
```
http://localhost:2002/
```
[^1]: Executar os comandos em 2 terminais **separados**.
Parar os processos com *CTRL+C*.