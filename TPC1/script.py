import xml.etree.ElementTree as ET
import shutil
import os
import re

html = """<!DOCTYPE html>
<html>
<head>
    <title>TPC1 - EngWeb2024</title>
    <meta charset="UTF-8"/>
</head>
<body>
"""

template = html

html += "\t<h1>Mapa Virtual</h1>\n"
html += "\t<h2>Índice</h2>\n"
html += "\t<ul>\n"

# Verificar se existe a diretoria e elimina a mesma caso exista
if os.path.exists("htmlRuas"):
    shutil.rmtree("htmlRuas")
os.mkdir("htmlRuas")

# Caminho até aos ficheiros xml, encontram-se 2 diretorias a cima
directoryPath = '../../MapaRuas-materialBase/texto/'

listaRuas = {}

# Processa o texto e destaca os elementos necessários
def processText(elem):
    text = ""
    if elem.text:
        text += elem.text
    for child in elem:
        if child.tag in ['data','entidade','lugar']:
            text += f"<b>{child.text}</b>"
        elif child.tag == 'para':
            text += processText(child)
        else:
            text += child.text if child.text else ''
        
        if child.tail:
            text += child.tail

    return text

for filename in os.listdir(directoryPath):
    nomeRuaSemEspacos = filename[7:-4]
    nomeRua = ' '.join(re.findall('[A-Z][^A-Z]*', filename[7:-4])) # Remover o MRB-XX e o .xml
    filePath = os.path.join(directoryPath, filename)
    
    tree = ET.parse(filePath)
    root = tree.getroot()

    meta = root.find('meta')
    corpo = root.find('corpo')
    listaCasas = corpo.find('lista-casas')

    # Criar página html para cada uma delas com conteúdo
    templateRua = template
    numeroRua = meta.find('número').text
    listaRuas[int(numeroRua)] = nomeRua

    templateRua += f"\t<h1>Rua {numeroRua}: {meta.find('nome').text}</h1>\n\t<hr />\n"
    # Descrição
    templateRua += f"\t<h2>Descrição</h2>\n"
    for paragrafos in corpo.findall('para'):
        texto = processText(paragrafos)
        templateRua += f"\t<p>{texto}</p>\n"

    # Imagens
    templateRua += f"\t<p></p>\n\t<hr />\n\t<h2>Imagens</h2>\n\t<h3>Atuais</h3>"
    # Atuais
    directoryFotoAtual = "../../MapaRuas-materialBase/atual/"
    for filename in os.listdir(directoryFotoAtual):
        numeroRuaHifen = numeroRua + "-"
        if filename.startswith(numeroRuaHifen):
            templateRua += f"\t<img src='../../../MapaRuas-materialBase/atual/{filename}' style='max-height: 400px;'>\n"
    # Antigas
    templateRua += "\t<h3>Antigas</h3>"
    for figura in corpo.findall('figura'):
        figuraPath = figura.find('imagem').get('path')[3:]
        templateRua += f"\t<img src='../../../MapaRuas-materialBase/{figuraPath}' style='max-height: 400px;'>\n"
        templateRua += f"\t<p>{figura.find('legenda').text}</p>\n"
    
    # Lista de Casas
    templateRua += f"\t<p></p>\n\t<hr />\n\t<h2>Lista de casas</h2>\n"
    if listaCasas is not None:
        for casa in listaCasas.findall('casa'):
            casa_numero = casa.find('número').text if casa.find('número') is not None else "N/A"
            enfiteuta = casa.find('enfiteuta').text if casa.find('enfiteuta') is not None else "N/A"
            foro = casa.find('foro').text if casa.find('foro') is not None else "N/A"
            vista = casa.find('vista').text if casa.find('vista') is not None else "N/A"
            if casa.find('desc') is not None:
                desc = processText(casa.find('desc'))
            else:
                desc = "N/A"

            templateRua += f"\t<h4>Casa número {casa_numero}</h4>\n"
            templateRua += f"\t<p><b>Enfiteuta: </b> {enfiteuta}</p>\n"
            templateRua += f"\t<p><b>Foro: </b> {foro}</p>\n"
            templateRua += f"\t<p><b>Vista: </b> {vista}</p>\n"
            templateRua += f"\t<p><b>Descrição: </b> {desc}</p>\n\t<p></p>\n\t<hr />\n"
    else:
        templateRua += "<p>N/A</p>\n"
    
    # Voltar
    templateRua += f"\t<h4><a href='../ruasBraga.html'>Voltar</a><h5>\n"
    
    templateRua += "</body>\n"
    templateRua += "</html>"

    fileCidade = open(f"htmlRuas/{nomeRuaSemEspacos}.html", "w", encoding="utf-8")
    fileCidade.write(templateRua)
    fileCidade.close()

# Adicionar ruas ao indíce ordenadas pelo número de rua
for number , name in sorted(listaRuas.items()):
    nomeSemEspaços = name.replace(" ","")
    html += f"\t\t<li><a href='htmlRuas/{nomeSemEspaços}.html'>{name}</a></li>\n"

html += "\t<ul>\n"

html += "</body>\n"
html += "</html>"

file = open("ruasBraga.html", "w", encoding="utf-8")
file.write(html)
file.close()