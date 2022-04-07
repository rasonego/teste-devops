# Test Report



## Pré-requisitos

1. Minikube


## Criação de Dockerfile e imagem Docker
Primeiramente testei a aplicação localmente utilizando o VScode com os comandos "npm install" para as dependências contidas no arquivo package.jason serem instaladas. Com o comando "npm start", a aplicação foi inicializada na porta 3000, default da própria aplicação. Abri o navegador e com o comando "localhost:3000" a mensagem {"Hello World"} apareceu na tela indicando SUCESSO.
 
Com sucesso do teste local, comecei a criação do arquivo Dockerfile e utilizei os seguintes comandos:

FROM node:16 -> para o Docker buscar no Docker Hub a imagem do Node na versão 16 WORKDIR /app-node -> definição do diretório padrão. COPY . . -> com o 1º ponto, será copiado os arquivos do host para dentra imagem, sendo o 2º ponto. RUN npm install -> instalar todas as dependências da aplicação ENTRYPOINT npm start -> start da aplicação

Com o comando "docker build -t rafaelsonego/app-node:1.0" criei a imagem e utilizando o comando "docker run -d -p 8080:3000 rafaelsonego/app-node:1.0" executei o container para testar a aplicação, redirecionando a porta 8080(host) para a porta 3000(app) e por assim, testando com o comando "localhost:8080"

## Deploy da aplicação em Minikube
OBS: A estrutura interna do minikube(windows) que usei para simular o Kubernetes, é muito diferente do Kubernetes padrão, pois o Docker Desktop, usa uma camada extra, essa, denominada minekube, fez com que eu tivesse usado praticamente todo o tempo do teste na tentativa de subir a aplicação para uso externo(External_IP) com assertividade.

Portanto, peço uma resalva nas tentativas frustadas, e não por falta de conhecimento, e sim por ter que descobrir o caminho totalmente diferente que o minikube faz ao expor o "External IP", e com isso atrasando a entrega do teste. Felizmente obtive SUCESSO na criação do "pod" utilizando a imagem que gerei pelo "docker build" apesar das divesas tentativas e fazendo o push da imagem no Docker Hub, pois o kubernetes não tinha permissão para acessar a imagem do Docker Desktop localmente, onde também foram feitas várias tentativas, inclusive alterações nas variáveis de ambiente do Kubernetes e diversos Factory Resets no Docker Desktop e Kubernetes para tentar corrigir algum possível problema.

SUCESSO total na criação do Pod para disponibilização local da aplicação.

Criei um arquivo "pod.yaml" com as configurações necessárias para subir 3 réplicas para haver redundância dos nós e pods.

Como solicitado, foi criado as rotas no /health "readinessProbe" e "livenessProbe:" caso a aplicação não consiga o código "200" no request, porém não funcionaram

A replicação dos pods, funcionaram 100%

----------------------------------------------------------------------------------------------------------------
Em uma 2º tentativa, consegui criar 4 réplicas para serem balanceadas pelo serviço de Load Balance e finalmente a aplicação subiu 100% e foi colocada no IP interno "127.0.0.1:7080" com o comando "kubectl port-forward service/app-node 7080:8080" para redirecionamento de porta.




## Infrastructure as Code



