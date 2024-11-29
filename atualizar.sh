#!/bin/bash

# Remove todos os arquivos exceto o Dockerfile, o próprio script e o .env
find . -maxdepth 1 -type f ! -name "Dockerfile" ! -name "atualizar.sh" ! -name ".env" -exec rm -f {} \;
find . -maxdepth 1 -type d ! -name "." ! -name ".." ! -name ".git" -exec rm -rf {} \;

# Remove o .git se existir e reinicializa o repositório
rm -rf .git

# Inicializa o repositório e configura o remote
git init
git remote add origin https://github.com/christophergouveia/talktalk.git

# Força o pull do repositório GitHub
git fetch origin
git reset --hard origin/main

# Move os arquivos do server para a pasta server na raiz
cp -rf server/* ../nodejs-talktalk/
sudo chown -R ubuntu:ubuntu .

printf "Atualização concluída com sucesso! \n"