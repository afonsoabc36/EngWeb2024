import xml.etree.ElementTree as ET
import os

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

# Criar a lista de ruas a partir do nome dos ficheiros
# Pegar na lista de ruas e fazer o índice
# Criar os links para cada uma das páginas html deles
# \t para fazer ytab, \n para new line
# os.mkdir("ruas")

# Caminho até aos ficheiros xml
directoryPath = '../../MapaRuas-materialBase/texto/'

for filename in os.listdir(directoryPath):
    filePath = os.path.join(directoryPath, filename)
    
    tree = ET.parse(filePath)
    root = tree.getroot()

    # Criar página html para cada uma delas
    templateRua = template
    #template += 

    #write(ruas/...)

# html += "</body>\n"
# html += "</html>"
