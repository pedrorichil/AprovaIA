#!/bin/bash

# Nome do diretório principal do projeto
PROJECT_DIR="backend_python"

# Criação dos diretórios principais e subdiretórios
mkdir -p $PROJECT_DIR/{core,crud,routers,schemas,services}

# Arquivos dentro do diretório core
touch $PROJECT_DIR/core/{config.py,database.py,dependencies.py,security.py}

# Arquivos dentro do diretório crud
touch $PROJECT_DIR/crud/{objective.py,question.py,squad.py,user.py}

# Arquivos dentro do diretório routers
touch $PROJECT_DIR/routers/{auth.py,objectives.py,questions.py,squads.py,users.py}

# Arquivos dentro do diretório schemas
touch $PROJECT_DIR/schemas/{objective.py,question.py,squad.py,token.py,user.py}

# Arquivos dentro do diretório services
touch $PROJECT_DIR/services/{gamification_service.py,study_plan_service.py}

# Arquivos raiz do projeto
touch $PROJECT_DIR/{.env,main.py,requirements.txt}

echo "Estrutura de pastas e arquivos criada com sucesso em $PROJECT_DIR/"
