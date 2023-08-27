INSERT INTO cargo
(nome, descricao)
VALUES('Professor', 'Cargo responsável por lecionar nas dependências internas da instituição.');
INSERT INTO cargo
(nome, descricao)
VALUES('Orientador', 'Cargo responsável por acompanhar o aprendiz em suas funções na empresas.');
INSERT INTO cargo
(nome, descricao)
VALUES('Administrativo', 'Cargo responsável por administrar internamente a instituição.');

INSERT INTO funcionario
(cpf, dt_nasc, dt_admissao, dt_demissao, status, nome_usuario, senha_usuario, Cargo_codigo, Pessoa_codigo)
VALUES('104.230.235-65', '2000-10-22', '2020-02-01', '0000-00-00', 'Ativo', 'edurossetti', 'edu123', 3, 4);
INSERT INTO funcionario
(cpf, dt_nasc, dt_admissao, dt_demissao, status, nome_usuario, senha_usuario, Cargo_codigo, Pessoa_codigo)
VALUES('120.246.232-00', '1999-05-10', '2009-10-20', '0000-00-00', 'Inativo', 'felipenogueira', 'felipe123', 3, 5);
INSERT INTO funcionario
(cpf, dt_nasc, dt_admissao, dt_demissao, status, nome_usuario, senha_usuario, Cargo_codigo, Pessoa_codigo)
VALUES('102.465.321-26', '2001-10-20', '2019-02-01', '0000-00-00', 'Ativo', 'josepereira', 'jose123', 3, 6);
INSERT INTO funcionario
(cpf, dt_nasc, dt_admissao, dt_demissao, status, nome_usuario, senha_usuario, Cargo_codigo, Pessoa_codigo)
VALUES('123.644.632-13', '1981-04-01', '2009-01-02', '0000-00-00', 'Ativo', 'aglaepereira', 'aglae123', 1, 15);
INSERT INTO funcionario
(cpf, dt_nasc, dt_admissao, dt_demissao, status, nome_usuario, senha_usuario, Cargo_codigo, Pessoa_codigo)
VALUES('123.456.497-63', '1982-05-01', '2009-10-02', '0000-00-00', 'Ativo', 'mariopazoti', 'mario123', 1, 16);
INSERT INTO funcionario
(cpf, dt_nasc, dt_admissao, dt_demissao, status, nome_usuario, senha_usuario, Cargo_codigo, Pessoa_codigo)
VALUES('123.479.864-31', '1979-05-02', '2011-04-01', '0000-00-00', 'Ativo', 'renatogoncalves', 'renato123', 1, 17);

INSERT INTO aluno
(rg, cpf, nome_mae, dt_nasc, escola, serie, periodo, Pessoa_codigo)
VALUES('14.655.152-6', '546.231.185-151', 'Josefina Alves Oliveira', '2006-10-14', 'E. E. Dr. Barbosa', '3º EM', 'Matutino', 7);
INSERT INTO aluno
(rg, cpf, nome_mae, dt_nasc, escola, serie, periodo, Pessoa_codigo)
VALUES('22.141.231-4', '472.290.598-36', 'Maria Aparecida dos Santos Melo', '2000-10-22', 'Etec Deputado Francisco Franco', '3° EM', 'Matutino', 8);
INSERT INTO aluno
(rg, cpf, nome_mae, dt_nasc, escola, serie, periodo, Pessoa_codigo)
VALUES('12.336.549-6', '231.235.465-97', 'Francisca Aidar Silva', '2005-05-01', 'IFSP', '2º EM', 'Vespertino', 9);
INSERT INTO aluno
(rg, cpf, nome_mae, dt_nasc, escola, serie, periodo, Pessoa_codigo)
VALUES('14.659.874-6', '564.921.354-13', 'Joana Pereira Nascimento', '2007-06-05', 'Instituto Sagrado Coração de Jesus', '1º EM', 'Noturno', 10);
INSERT INTO aluno
(rg, cpf, nome_mae, dt_nasc, escola, serie, periodo, Pessoa_codigo)
VALUES('21.356.465-1', '498.654.121-13', 'Mariana Soares da Costa', '2008-09-04', 'E. M. Dr. Gerson Arantes Silva', '9º Ano', 'Matutino', 11);
INSERT INTO aluno
(rg, cpf, nome_mae, dt_nasc, escola, serie, periodo, Pessoa_codigo)
VALUES('45.231.323-6', '458.785.412-36', 'Giovana Marques Souza', '2006-01-31', 'E. E. Joana Fregoli', '1º EM', 'Vespertino', 12);
INSERT INTO aluno
(rg, cpf, nome_mae, dt_nasc, escola, serie, periodo, Pessoa_codigo)
VALUES('12.346.598-5', '321.452.313-16', 'Maria Oliveira de Souza', '2004-10-05', 'E. E. Luiz Dorini', '2º EM', 'Matutino', 13);
INSERT INTO aluno
(rg, cpf, nome_mae, dt_nasc, escola, serie, periodo, Pessoa_codigo)
VALUES('14.236.654-9', '652.314.653-21', 'Adriana Blaszczykowski', '2005-09-08', 'IFPR', '2º EM', 'Matutino', 14);
INSERT INTO aluno
(rg, cpf, nome_mae, dt_nasc, escola, serie, periodo, Pessoa_codigo)
VALUES('12.321.456-1', '213.321.452-31', 'Maria Aparecida', '2003-10-22', 'E. E. X', '3º EM', 'Vespertino', 18);


INSERT INTO curso
(nome, sala, eixo, carga_h, dt_criacao, dt_desativacao)
VALUES('Aprendizagem em Recepção', 'Sala 3', 'Comunicação', '40', '2023-02-01', '');
INSERT INTO curso
(nome, sala, eixo, carga_h, dt_criacao, dt_desativacao)
VALUES('Informática', 'Sala 3', 'Tecnologia', '120', '2019-02-01', '');
INSERT INTO curso
(nome, sala, eixo, carga_h, dt_criacao, dt_desativacao)
VALUES('Comunicação e Linguagem', 'Sala 3', 'Comunicação', '40', '2022-02-01', '');
INSERT INTO curso
(nome, sala, eixo, carga_h, dt_criacao, dt_desativacao)
VALUES('Técnicas em Serviços de Supermercados', 'Sala 2', 'Comércio', '120', '2022-07-01', '2023-02-01');
INSERT INTO curso
(nome, sala, eixo, carga_h, dt_criacao, dt_desativacao)
VALUES('Técnicas em Controle de Qualidade', 'Sala 2', 'Segurança e Qualidade', '40', '2021-02-01', '2022-07-01');
INSERT INTO curso
(nome, sala, eixo, carga_h, dt_criacao, dt_desativacao)
VALUES('Técnicas em Segurança do Trabalho', 'Sala 2', 'Segurança e Qualidade', '80', '2022-02-01', '');
INSERT INTO curso
(nome, sala, eixo, carga_h, dt_criacao, dt_desativacao)
VALUES(' Técnicas em Escritório', 'Sala 9', 'Administrativo', '120', '2019-07-01', '');

INSERT INTO empresa
(cnpj, ie, proprietario, Pessoa_codigo)
VALUES('10.123.645/6232-12', '124536554132', 'José Carlos Godoi Silveira', 1);
INSERT INTO empresa
(cnpj, ie, proprietario, Pessoa_codigo)
VALUES('23.265.612/1216-51', '656231251122', 'Márcio Rodrigo Magurno', 2);
INSERT INTO empresa
(cnpj, ie, proprietario, Pessoa_codigo)
VALUES('25.012.329/6556-12', '112012032059', 'Felipe Garcia Dias', 3);

INSERT INTO turma
(periodo, ano_letivo, dt_inicio, dt_fim, status, vagas, Funcionario_codigo, Curso_codigo)
VALUES('Noturno', '2000', '2022-02-01', '2022-12-01', 'Inativo', 50, 4, 1);
INSERT INTO turma
(periodo, ano_letivo, dt_inicio, dt_fim, status, vagas, Funcionario_codigo, Curso_codigo)
VALUES('Vespertino', '2023', '2002-10-22', '0000-00-00', 'Ativo', 25, 5, 2);
INSERT INTO turma
(periodo, ano_letivo, dt_inicio, dt_fim, status, vagas, Funcionario_codigo, Curso_codigo)
VALUES('Matutino', '2021', '2023-01-22', '2024-01-12', 'Ativo', 100, 5, 3);
INSERT INTO turma
(periodo, ano_letivo, dt_inicio, dt_fim, status, vagas, Funcionario_codigo, Curso_codigo)
VALUES('Matutino', '2023', '2024-01-01', '0000-00-00', 'Inativo', 25, 6, 4);




-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Supermercados Avenida', '(18) 3265-4432', 'supavenida@cobranca.com', 'Rua Hélio Alves, 210', 'Centro', 'Rancharia', '19600-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Supermercados Dois Irmãos de Rancharia', '(18) 3265-1788', 'doisirmaos.supermercados@contato.com', 'Rua Felipe Camarão, 995', 'Vila Nova', 'Rancharia', '19600-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Auto Elétrica São Manoel', '(11) 3254-8333', 'saomanoel.autoeletrica@contato.com', 'Avenida Pedro de Toledo, 500', 'Centro', 'Martinópolis', '15770-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Eduardo Rossetti dos Santos Melo', '(18) 99645-4493', 'edurossetti@hotmail.com', 'Rua José Pereira Dutra, 140', 'Jardim Europa', 'Rancharia', '19600-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Felipe Nogueira da Silva', '(18) 99754-6321', 'felipenogueira@gmail.com', 'Rua Ademar de Barros, 20', 'Vila Industrial', 'Rancharia', '19600-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('José Pereira Manoel Dias', '(18) 99745-6598', 'josepereira@contato.com', 'Rua Gilmar Barbosa, 89', 'Vila Manoel', 'Martinópolis', '19875-656', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Karén de Oliveira', '(18) 99647-9895', 'karenoliveira10@gmail.com', 'Rua Carlos Almeida, 45', 'Vila Cantizani', 'Rancharia', '19600-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Eduardo Rossetti', '(18) 99645-4493', 'ermelo@unoeste.edu.br', 'Rua José Pereira Dutra, 140', 'Jardim América', 'Rancharia', '19600-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Carlos Miguel Aidar', '(18) 99781-6321', 'aidarfrancisca@gmail.com', 'Rua Adelaide Cristin, 80', 'Jardim Europa', 'Rancharia', '19600-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Adilson Pereira de Souza', '(18) 99798-6532', 'pereiraadilson@outlook.com', 'Rua Noêmia Dias, 165', 'Vila Cantizani', 'Rancharia', '19600-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Mateus da Costa', '(18) 99784-5699', 'mateuscosta@contato.com', 'Rua Charles Bueno, 98', 'Vila Nova', 'Rancharia', '19600-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Heitor Augusto Souza', '(18) 99745-7979', 'heitorsouza@gmail.com', 'Rua Coronel Barbosa, 987', 'Vila Industrial', 'Martinópolis', '18974-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Ana Lívia Oliveira', '(18) 99721-7966', 'anaoliveiralivia@yahoo.com', 'Rua Manoel das Rosas, 40', 'Vila Cássia Barbosa', 'João Ramalho', '18796-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Letícia Blaszczykowski', '(17) 98654-3211', 'blaszczykowski@contato.com', 'Rua Manoel de Nóbrega, 65', 'Vila Joseph Ratzinger', 'Cornélio Procópio', '14236-500', 'PR');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Aglaê Pereira Zaupa', '(18) 99756-4813', 'aglaepereirazaupa@contato.com', 'Rua José Francisco Cavaleiro', 'Jardim Alvorada', 'Presidente Prudente', '15478-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Mário Augusto Pazoti', '(18) 99784-6531', 'mariopazoti@gmail.com', 'Rua Tenente Augusto Bezerra', 'Jardim Primavera', 'Presidente Prudente', '19456-000', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Renato Fernando Silva Gonçalvez', '(18) 99765-4631', 'renatogoncalves@contato.com', 'Rua Coronel Barbosa, 40', 'Jardim Beethoven', 'Presidente Prudente', '32165-463', 'SP');
-- INSERT INTO pessoa
-- (nome, telefone, email, endereco, bairro, cidade, cep, uf)
-- VALUES('Fernando dos Santos', '(18) 99789-6541', 'edu@gmail.com', 'Rua X', 'Jardim Y', 'Rancharia', '19600-000', 'SP');