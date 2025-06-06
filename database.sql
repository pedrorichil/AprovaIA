-- Script SQL para MariaDB - AprovaIA
-- Certifique-se de que está a utilizar o motor de armazenamento InnoDB para suporte a chaves estrangeiras.
-- SET default_storage_engine=InnoDB;

-- Módulo 1: Núcleo do Usuário e Autenticação 👤
-- Este módulo gerencia quem são nossos usuários e seus acessos.

CREATE TABLE Planos_Assinatura (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do plano.',
    nome VARCHAR(50) NOT NULL COMMENT 'Nome do plano (Ex: "Gratuito", "Premium Mensal").',
    descricao TEXT COMMENT 'Detalhes sobre os benefícios do plano.',
    limite_questoes_dia INT COMMENT 'Limite de questões que podem ser respondidas por dia para planos gratuitos (NULL se for ilimitado).'
) COMMENT='Tabela que armazena os diferentes planos de assinatura disponíveis (ex: Gratuito, Premium).';

CREATE TABLE Mentores_IA (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do mentor IA.',
    nome VARCHAR(50) NOT NULL COMMENT 'Nome da personalidade do mentor IA (Ex: "Sargento", "Sábia").',
    personalidade_descricao TEXT COMMENT 'Descrição do estilo de motivação e comunicação do mentor.'
) COMMENT='Tabela que armazena as diferentes personalidades de mentores IA disponíveis.';

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do usuário.',
    nome_completo VARCHAR(255) NOT NULL COMMENT 'Nome completo do usuário.',
    email VARCHAR(255) UNIQUE NOT NULL COMMENT 'E-mail do usuário, utilizado para login e deve ser único.',
    senha_hash VARCHAR(255) NOT NULL COMMENT 'Hash da senha do usuário para armazenamento seguro.',
    xp_total BIGINT DEFAULT 0 COMMENT 'Total de pontos de experiência acumulados pelo usuário.',
    nivel INT DEFAULT 1 COMMENT 'Nível atual do usuário no sistema, baseado no XP.',
    ofensiva_dias INT DEFAULT 0 COMMENT 'Contador de dias consecutivos de estudo (streak).',
    id_plano_assinatura INT COMMENT 'Chave estrangeira referenciando o plano de assinatura atual do usuário.',
    id_mentor_escolhido INT COMMENT 'Chave estrangeira referenciando a personalidade de IA escolhida pelo usuário como mentor.',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora em que o usuário se cadastrou na plataforma.',
    FOREIGN KEY (id_plano_assinatura) REFERENCES Planos_Assinatura(id),
    FOREIGN KEY (id_mentor_escolhido) REFERENCES Mentores_IA(id)
) COMMENT='Tabela central para armazenar informações dos usuários da plataforma.';


-- Módulo 2: Conteúdo e Estrutura de Aprendizagem 📚
-- Aqui fica todo o conhecimento que a plataforma oferece.

CREATE TABLE Objetivos (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do objetivo.',
    nome VARCHAR(255) NOT NULL COMMENT 'Nome do objetivo (Ex: "ENEM 2025", "Concurso PRF").',
    descricao TEXT COMMENT 'Breve descrição do objetivo.'
) COMMENT='Tabela para armazenar os grandes objetivos de estudo que os usuários podem perseguir (ex: ENEM, Concursos).';

CREATE TABLE Competencias (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da competência.',
    nome VARCHAR(255) NOT NULL COMMENT 'Nome da competência (Ex: "Matemática", "Análise Combinatória").',
    id_objetivo INT COMMENT 'Chave estrangeira indicando a qual grande objetivo esta competência pertence.',
    id_pai INT COMMENT 'Chave estrangeira para criar a hierarquia (ex: "Análise Combinatória" é filha de "Matemática"). NULL se for uma competência raiz.', -- FK para a própria tabela Competencias
    FOREIGN KEY (id_objetivo) REFERENCES Objetivos(id),
    FOREIGN KEY (id_pai) REFERENCES Competencias(id)
) COMMENT='Tabela para definir as competências e sub-competências de estudo, organizadas hierarquicamente.';

CREATE TABLE Conteudos (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do conteúdo.',
    titulo VARCHAR(255) NOT NULL COMMENT 'Título da pílula de conhecimento.',
    corpo TEXT COMMENT 'O conteúdo textual principal. Pode ser NULL dependendo do formato.',
    formato VARCHAR(20) NOT NULL COMMENT 'Tipo do conteúdo (ex: ''texto'', ''audio_url'', ''video_url'', ''mapa_mental_json'').',
    id_competencia INT NOT NULL COMMENT 'Chave estrangeira indicando a qual competência este conteúdo pertence e ensina.',
    FOREIGN KEY (id_competencia) REFERENCES Competencias(id)
) COMMENT='Tabela que armazena as "pílulas de conhecimento" em diversos formatos.';

CREATE TABLE Questoes (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da questão.',
    enunciado TEXT NOT NULL COMMENT 'O texto da pergunta da questão.',
    opcoes JSON COMMENT 'Um JSON com as opções da questão. Ex: [{"id": "A", "texto": "..."}, {"id": "B", ...}]. (MariaDB usa JSON que é um alias para LONGTEXT com validação)',
    resposta_correta VARCHAR(10) NOT NULL COMMENT 'O identificador da opção correta (Ex: "A").',
    texto_justificativa TEXT COMMENT 'A explicação detalhada do porquê da resposta ser a correta.',
    id_competencia INT NOT NULL COMMENT 'Chave estrangeira indicando a qual competência esta questão avalia.',
    FOREIGN KEY (id_competencia) REFERENCES Competencias(id)
) COMMENT='Tabela para armazenar as questões de múltipla escolha ou outros formatos.';


-- Módulo 3: A Jornada de Aprendizagem (IA) 🚀
-- O coração da personalização, onde a magia da IA acontece.

CREATE TABLE Planos_Estudo (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do plano de estudo.',
    id_usuario INT NOT NULL COMMENT 'Chave estrangeira referenciando o usuário dono deste plano.',
    id_objetivo INT NOT NULL COMMENT 'Chave estrangeira referenciando o objetivo principal deste plano de estudo.',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora em que o plano de estudo foi gerado pela IA.',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Indica se este é o plano de estudo que o usuário está seguindo atualmente.',
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_objetivo) REFERENCES Objetivos(id)
) COMMENT='Armazena os planos de estudo gerados pela IA para os usuários.';

CREATE TABLE Tarefas_Diarias (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da tarefa diária.',
    id_plano_estudo INT NOT NULL COMMENT 'Chave estrangeira referenciando o plano de estudo ao qual esta tarefa pertence.',
    data_prevista DATE NOT NULL COMMENT 'O dia em que esta tarefa deve ser realizada.',
    tipo_recurso VARCHAR(20) NOT NULL COMMENT 'Indica se a tarefa é estudar um ''conteudo'' ou resolver uma ''questao''.', -- 'conteudo' ou 'questao'
    id_recurso INT NOT NULL COMMENT 'O ID do Conteudo ou Questao a ser estudado/resolvido. A tabela de origem depende do tipo_recurso.', -- ID do Conteudo ou Questao
    status VARCHAR(20) DEFAULT 'pendente' COMMENT 'Status atual da tarefa (ex: ''pendente'', ''concluido'', ''pulado'').', -- 'pendente', 'concluido', 'pulado'
    ordem INT COMMENT 'Ordem de exibição da tarefa no checklist do dia.',
    FOREIGN KEY (id_plano_estudo) REFERENCES Planos_Estudo(id) ON DELETE CASCADE
    -- Nota: id_recurso não pode ter FK direta pois pode ser de Conteudos ou Questoes.
    -- A lógica de qual tabela consultar será feita na aplicação.
) COMMENT='Define as tarefas específicas (estudar um conteúdo ou responder uma questão) para cada dia dentro de um plano de estudo.';

CREATE TABLE Respostas_Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da resposta.',
    id_usuario INT NOT NULL COMMENT 'Chave estrangeira referenciando o usuário que respondeu.',
    id_questao INT NOT NULL COMMENT 'Chave estrangeira referenciando a questão que foi respondida.',
    resposta_fornecida VARCHAR(10) COMMENT 'Qual opção o usuário marcou.',
    foi_correta BOOLEAN COMMENT 'Indica se a resposta do usuário foi correta (true) ou incorreta (false).',
    tempo_gasto_ms INT COMMENT 'Tempo em milissegundos que o usuário levou para responder à questão.',
    data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora em que a resposta foi enviada.',
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_questao) REFERENCES Questoes(id) ON DELETE CASCADE
) COMMENT='Registra as respostas fornecidas pelos usuários às questões.';

CREATE TABLE Caderno_Inteligente_Entradas (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da entrada no caderno inteligente.',
    id_usuario INT NOT NULL COMMENT 'Chave estrangeira referenciando o dono da entrada.',
    tipo_entrada VARCHAR(20) NOT NULL COMMENT 'Tipo da entrada (ex: ''destaque_texto'', ''erro_questao'').', -- 'destaque_texto' ou 'erro_questao'
    id_conteudo INT COMMENT 'Se for um destaque, aponta para o conteúdo original (NULLABLE).', -- NULLABLE
    texto_destacado TEXT COMMENT 'O trecho exato que o usuário marcou (NULLABLE).', -- NULLABLE
    id_questao INT COMMENT 'Se for um erro, aponta para a questão errada (NULLABLE).', -- NULLABLE
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora em que a entrada foi criada.',
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_conteudo) REFERENCES Conteudos(id) ON DELETE SET NULL,
    FOREIGN KEY (id_questao) REFERENCES Questoes(id) ON DELETE SET NULL
) COMMENT='Armazena entradas no "caderno inteligente" do usuário, como destaques em textos ou questões erradas para revisão.';

-- Módulo 4: Gamificação e Engajamento 🏅

CREATE TABLE Conquistas (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da medalha/conquista.',
    nome VARCHAR(100) NOT NULL COMMENT 'Nome da conquista (Ex: "Mestre dos 7 Dias", "Primeiro Passo").',
    descricao TEXT COMMENT 'Descrição da conquista (Ex: "Parabéns! Você estudou por 7 dias seguidos.").',
    icone_url VARCHAR(255) COMMENT 'Link para a imagem (ícone) da medalha.'
) COMMENT='Define as medalhas e conquistas que os usuários podem ganhar.';

CREATE TABLE Usuarios_Conquistas (
    id_usuario INT NOT NULL COMMENT 'Chave estrangeira referenciando o usuário que ganhou a medalha.',
    id_conquista INT NOT NULL COMMENT 'Chave estrangeira referenciando a medalha que foi ganha.',
    data_obtencao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora em que a medalha foi ganha.',
    PRIMARY KEY (id_usuario, id_conquista),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_conquista) REFERENCES Conquistas(id) ON DELETE CASCADE
) COMMENT='Tabela de ligação para registrar quais usuários ganharam quais conquistas.';
-- A Chave Primária Composta (id_usuario, id_conquista) garante que um usuário não ganhe a mesma medalha múltiplas vezes.

-- Módulo 5: Funcionalidades Sociais (Esquadrões) 🤝

CREATE TABLE Esquadroes (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do esquadrão.',
    nome VARCHAR(100) NOT NULL COMMENT 'Nome do esquadrão/time.',
    id_objetivo INT COMMENT 'Chave estrangeira opcional indicando se o esquadrão é focado em um objetivo comum.', -- Esquadrão focado em um objetivo comum
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora em que o esquadrão foi criado.',
    FOREIGN KEY (id_objetivo) REFERENCES Objetivos(id) ON DELETE SET NULL
) COMMENT='Tabela para armazenar informações sobre os esquadrões (times/grupos) de estudo.';

CREATE TABLE Usuarios_Esquadroes (
    id_usuario INT NOT NULL COMMENT 'Chave estrangeira referenciando o usuário membro do esquadrão.',
    id_esquadrao INT NOT NULL COMMENT 'Chave estrangeira referenciando o esquadrão ao qual o usuário pertence.',
    cargo VARCHAR(20) DEFAULT 'membro' COMMENT 'Cargo do usuário no esquadrão (ex: ''lider'', ''membro'').', -- 'lider', 'membro'
    PRIMARY KEY (id_usuario, id_esquadrao),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_esquadrao) REFERENCES Esquadroes(id) ON DELETE CASCADE
) COMMENT='Tabela de ligação para registrar os membros de cada esquadrão e seus cargos.';

-- Módulo 6: Personalização e Comunicação (Mentor IA) 🤖
-- A tabela Mentores_IA já foi criada no Módulo 1, pois é referenciada por Usuarios.
-- Nenhuma tabela adicional é necessária para este módulo conforme a descrição.

-- Adicionando alguns índices para otimizar consultas comuns:
-- A sintaxe para CREATE INDEX é a mesma entre PostgreSQL e MariaDB.

-- Módulo 1
CREATE INDEX idx_usuarios_email ON Usuarios(email);
CREATE INDEX idx_usuarios_id_plano_assinatura ON Usuarios(id_plano_assinatura);
CREATE INDEX idx_usuarios_id_mentor_escolhido ON Usuarios(id_mentor_escolhido);

-- Módulo 2
CREATE INDEX idx_competencias_id_objetivo ON Competencias(id_objetivo);
CREATE INDEX idx_competencias_id_pai ON Competencias(id_pai);
CREATE INDEX idx_conteudos_id_competencia ON Conteudos(id_competencia);
CREATE INDEX idx_questoes_id_competencia ON Questoes(id_competencia);

-- Módulo 3
CREATE INDEX idx_planos_estudo_id_usuario ON Planos_Estudo(id_usuario);
CREATE INDEX idx_planos_estudo_id_objetivo ON Planos_Estudo(id_objetivo);
CREATE INDEX idx_tarefas_diarias_id_plano_estudo ON Tarefas_Diarias(id_plano_estudo);
CREATE INDEX idx_tarefas_diarias_data_prevista ON Tarefas_Diarias(data_prevista);
CREATE INDEX idx_respostas_usuario_id_usuario ON Respostas_Usuario(id_usuario);
CREATE INDEX idx_respostas_usuario_id_questao ON Respostas_Usuario(id_questao);
CREATE INDEX idx_caderno_inteligente_id_usuario ON Caderno_Inteligente_Entradas(id_usuario);
CREATE INDEX idx_caderno_inteligente_id_conteudo ON Caderno_Inteligente_Entradas(id_conteudo);
CREATE INDEX idx_caderno_inteligente_id_questao ON Caderno_Inteligente_Entradas(id_questao);

-- Módulo 4
CREATE INDEX idx_usuarios_conquistas_id_conquista ON Usuarios_Conquistas(id_conquista);

-- Módulo 5
CREATE INDEX idx_esquadroes_id_objetivo ON Esquadroes(id_objetivo);
CREATE INDEX idx_usuarios_esquadroes_id_esquadrao ON Usuarios_Esquadroes(id_esquadrao);

