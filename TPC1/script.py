import xml.etree.ElementTree as ET
import shutil
import os
import re

html = """
<!DOCTYPE html>
<html>
<head>
    <title>TPC1 - EngWeb2024</title>
    <meta charset="UTF-8"/>
</head>
<body>

"""

template = html

html += "\t<ul>\n"

# Verificar se existe a diretoria e elimina a mesma
if os.path.exists("htmlRuas"):
    shutil.rmtree("htmlRuas")
os.mkdir("htmlRuas")

# Caminho até aos ficheiros xml
directoryPath = '../../MapaRuas-materialBase/texto/'

listaRuas = []

for filename in os.listdir(directoryPath):
    nomeRuaSemEspacos = filename[7:-4]
    nomeRua = ' '.join(re.findall('[A-Z][^A-Z]*', filename[7:-4])) # Remover o MRB-XX e o .xml
    listaRuas.append(nomeRua)
    filePath = os.path.join(directoryPath, filename)
    
    tree = ET.parse(filePath)
    root = tree.getroot()

    # Criar página html para cada uma delas com conteúdo
    templateRua = template
    #templateRua +=
    #templateRua += "</body>\n"
    #templateRua += "</html>\n" 

    #fileCidade = open(f"htmlRuas/{nomeRuaSemEspacos}.html", "w", encoding="utf-8")
    #fileCidade.write(templateRua)
    #fileCidade.close()

for elem in listaRuas: # ou sorted(listaRuas):
    nomeSemEspaços = elem.replace(" ","")
    html += f"\t\t<li><a href='html/{nomeSemEspaços}.html'>{elem}</a></li>\n"

html += "\t<ul>\n"

# html += "</body>\n"
# html += "</html>"
