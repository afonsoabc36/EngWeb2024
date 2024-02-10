#TPC1

**Descrição:**
Criação de uma página web principal com um indíce de 60 ruas, cada uma com a sua própria página.

**Resumo:**
A partir do dataset *MapaRuas-materialBase* que nos foi disponibilizado para a realização deste trabalho, foi possível criar o indíce e as respetivas páginas HTML das ruas nele presentes a  partir do nome dos ficheiros *xml* contidos na diretoria *texto*.
Para cada uma das páginas das ruas foi utilizado o mesmo template, começando por extrair a informação presente no ficheiro *xml*, como a descrição da rua, a localização das suas imagens e uma listagem de casas.
Foi então utilizado um script que aplicava o template para todos os ficheiros presentes na diretoria *texto*, preenchendo os campos de descrição e da listagem de casas apenas com informações do mesmo, mas ao mesmo tempo incluindo não apenas as imagens referidas no ficheiro *xml*, que se encontram na diretoria *imagem*, como também imagens da diretoria *atual*, obtidas a partir do número atribuído a cada rua.

**Notas:**
O dataset **[MapaRuas-materialBase](https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2023/aulas2023.html#P1)** encontra-se numa diretoria 2 níveis a cima da diretoria onde está presente o script.
