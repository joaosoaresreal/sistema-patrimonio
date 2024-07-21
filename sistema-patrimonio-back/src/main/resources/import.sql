-- INSERT SQL DE DESENVOLVIMENTO E TESTES DO SISTEMA DE CONTROLE PATRIMONIAL

--INSERINDO DADOS NA TABELA DE ROLE
INSERT INTO TB_ROLE (authority) VALUES ('ROLE_OPERADOR');
INSERT INTO TB_ROLE (authority) VALUES ('ROLE_ADMIN');

--INSERINDO DADOS NA TABELA DE EMPRESA
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('34.614.517/0001-92', 'SS Tech', '(67) 99809-6541', 'joao.soares8@estudante.ifms.edu.br', 'Avenida Principal, 100 - Centro, Naviraí/MS');

--INSERINDO DADOS NA TABELA DEPARTAMENTO
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Administrativo', '(67) 3409-5542', 'administrativo@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Gerencia', '(67) 3409-5512', 'gerencia@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Suporte', '(67) 3409-5501', 'suporte@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Recepcao', '(67) 3409-5500', 'recepcao@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Vendas', '(11) 1234-5678', 'vendas@email.com', 'Rua das Vendas, 123', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('RH', '(22) 2345-6789', 'rh@email.com', 'Avenida do RH, 456', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Financeiro', '(33) 3456-7890', 'financeiro@email.com', 'Praça Financeira, 789', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('TI', '(44) 4567-8901', 'ti@email.com', 'Alameda da TI, 012', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Marketing', '(55) 5678-9012', 'marketing@email.com', 'Estrada do Marketing, 345', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Produção', '(66) 6789-0123', 'producao@email.com', 'Travessa da Produção, 678', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Jurídico', '(77) 7890-1234', 'juridico@email.com', 'Avenida Jurídica, 901', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Logística', '(88) 8901-2345', 'logistica@email.com', 'Rua da Logística, 234', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Qualidade', '(99) 9012-3456', 'qualidade@email.com', 'Praça da Qualidade, 567', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Atendimento ao Cliente', '(10) 0123-4567', 'atendimento@email.com', 'Avenida do Atendimento, 890', 1);

--INSERINDO DADOS NA TABELA USUARIO
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('João Soares', '123.456.789-00', '(67) 98787-6565', '', 'joao@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 1)
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Sanda Sedano', '032.165.549-87', '(67) 98522-9175', '', 'sandra@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 2)
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Rosana Caldeiras', '147.852.000-00', '(67) 99809-6541', '', 'rosana@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 3)
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Usuario Teste', '345.678.901-23', '(11) 1234-5678', '', 'user@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 8)
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Admin Teste', '456.789.012-34', '(22) 2345-6789', '', 'admin@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 1)

--INSERINDO DADOS NA TABELA ROLE
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (1, 2); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (2, 2); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (3, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (4, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (5, 2);

--INSERINDO DADOS NA TABELA PATRIMONIO
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('AA000', 'Impressora HP', 'BOM', 'Sala 01 - adm', '2023-06-22', 'Impressora esta na manutenção', 1, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('AA111', 'Maquina de Datilografar', 'BOM', 'Sala Gerencia - 2º Piso', '2000-06-22', '', 2, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('AA222', 'Computador Dell - Core i3 5ª Geração', 'EXCELENTE', 'Recepcao - Balcao', '2021-06-22', 'Mouse foi substituido por um HP', 4, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('AA333', 'Computador Acer - Core i7 5ª Geração', 'EXCELENTE', 'Recepcao - Balcao', '2021-06-22', 'AAAAA', 4, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('AA444', 'Computador Lenovo - Intel Celeron', 'BOM', 'Recepcao - Balcao', '2021-06-22', 'AAA', 4, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ001', 'Computador Dell', 'BOM', 'Sala 101', '2023-01-01', 'Nenhum', 1, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ002', 'Mesa de Escritório', 'EXCELENTE', 'Escritório Principal', '2023-01-02', 'Alguns arranhões', 2, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ003', 'Projetor Epson', 'BOM', 'Sala de Reuniões', '2023-01-03', 'Com controle remoto', 3, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ004', 'Cadeira Ergonômica', 'BOM', 'Sala de Trabalho', '2023-01-04', 'Ajustável em altura', 4, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ005', 'Impressora HP', 'DANIFICADO', 'Almoxarifado', '2023-01-05', 'Baixa de toner', 5, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ006', 'Ar Condicionado', 'EXCELENTE', 'Sala 102', '2023-01-06', 'Manutenção recente', 6, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ007', 'Notebook Lenovo', 'BOM', 'Sala de Treinamento', '2023-01-07', 'Com adaptador HDMI', 7, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ008', 'Estante de Livros', 'DANIFICADO', 'Biblioteca', '2023-01-08', 'Algumas prateleiras quebradas', 8, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ009', 'Telefone VoIP', 'BOM', 'Recepção', '2023-01-09', 'Com viva-voz', 9, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ010', 'Quadro Branco', 'EXCELENTE', 'Sala de Aula 1', '2023-01-10', 'Com marcadores', 10, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ011', 'Caixa de Som Bluetooth', 'BOM', 'Área de Convivência', '2023-01-11', 'Com bateria recarregável', 1, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ012', 'Máquina de Café', 'EXCELENTE', 'Cafeteria', '2023-01-12', 'Funcionando perfeitamente', 2, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ031', 'Monitor LG', 'BOM', 'Sala 201', '2023-01-31', 'Resolução Full HD', 3, 'ATIVO');
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ032', 'Projetor BenQ', 'EXCELENTE', 'Sala 201', '2023-01-30', '', 3, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ033', 'Cadeira de Escritório', 'BOM', 'Sala de Trabalho', '2023-02-02', 'Acolchoada e confortável', 5, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ034', 'Impressora Epson', 'DANIFICADO', 'Almoxarifado', '2023-02-03', 'Problema no alimentador de papel', 6, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ035', 'Ar Condicionado', 'EXCELENTE', 'Sala 103', '2023-02-04', 'Recentemente limpo e revisado', 7, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ036', 'Notebook HP', 'BOM', 'Sala de Treinamento', '2023-02-05', 'Windows 10 instalado', 8, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ037', 'Estante de DVDs', 'DANIFICADO', 'Biblioteca', '2023-02-06', 'Prateleiras soltas', 9, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ038', 'Telefone Fixo', 'BOM', 'Recepção', '2023-02-07', 'Linha direta com ramais internos', 10, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ039', 'Quadro Magnético', 'EXCELENTE', 'Sala de Aula 2', '2023-02-08', 'Ideal para anotações', 1, 'ATIVO');
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk, STATUS) VALUES ('PLQ040', 'Cafeteira Industrial', 'BOM', 'Cafeteria', '2023-02-09', 'Prepara café em grande quantidade', 2, 'BAIXADO');

-- INSERINDO DADOS NA TABELA DE REGISTRO DAS TRANSFERENCIA PATRIMONIAL
INSERT INTO tb_transfere_patrimonio (DATA_HORA_MODIFICACAO, ID_DEPARTAMENTO_TRANSF_FK, ID_PATRIMONIO_FK, DEPTO_ANTERIOR, ESTADO, LOCAL_ANTERIOR, OBS_ANTERIOR, PLAQUETA, ID_USUARIO_FK) VALUES ('2024-02-01 20:36:38.970764', 9, 2, 'Gerencia', 'BOM', 'Sala Gerencia - 2º Piso', '', 'AA111', 1);
INSERT INTO tb_transfere_patrimonio (DATA_HORA_MODIFICACAO, ID_DEPARTAMENTO_TRANSF_FK, ID_PATRIMONIO_FK, DEPTO_ANTERIOR, ESTADO, LOCAL_ANTERIOR, OBS_ANTERIOR, PLAQUETA, ID_USUARIO_FK) VALUES ('2024-02-02 20:38:25.242551', 13, 11, 'RH', 'EXCELENTE', 'Sala 102', 'Manutenção recente', 'PLQ006', 2);
INSERT INTO tb_transfere_patrimonio (DATA_HORA_MODIFICACAO, ID_DEPARTAMENTO_TRANSF_FK, ID_PATRIMONIO_FK, DEPTO_ANTERIOR, ESTADO, LOCAL_ANTERIOR, OBS_ANTERIOR, PLAQUETA, ID_USUARIO_FK) VALUES ('2024-02-05 20:38:35.886392', 4, 24, 'Marketing', 'DANIFICADO', 'Biblioteca', 'Prateleiras soltas', 'PLQ037', 1);
INSERT INTO tb_transfere_patrimonio (DATA_HORA_MODIFICACAO, ID_DEPARTAMENTO_TRANSF_FK, ID_PATRIMONIO_FK, DEPTO_ANTERIOR, ESTADO, LOCAL_ANTERIOR, OBS_ANTERIOR, PLAQUETA, ID_USUARIO_FK) VALUES ('2024-02-08 20:38:43.975580', 1, 25, 'Produção', 'BOM', 'Recepção', 'Linha direta com ramais internos', 'PLQ038', 2);
INSERT INTO tb_transfere_patrimonio (DATA_HORA_MODIFICACAO, ID_DEPARTAMENTO_TRANSF_FK, ID_PATRIMONIO_FK, DEPTO_ANTERIOR, ESTADO, LOCAL_ANTERIOR, OBS_ANTERIOR, PLAQUETA, ID_USUARIO_FK) VALUES ('2024-02-10 20:38:52.484042', 12, 1, 'Administrativo', 'BOM', 'Sala 01 - adm', 'Impressora esta na manutenção', 'AA000', 1);
INSERT INTO tb_transfere_patrimonio (DATA_HORA_MODIFICACAO, ID_DEPARTAMENTO_TRANSF_FK, ID_PATRIMONIO_FK, DEPTO_ANTERIOR, ESTADO, LOCAL_ANTERIOR, OBS_ANTERIOR, PLAQUETA, ID_USUARIO_FK) VALUES ('2024-02-10 20:39:01.390161', 13, 16, 'Administrativo', 'BOM', 'Área de Convivência', 'Com bateria recarregável', 'PLQ011', 2);
INSERT INTO tb_transfere_patrimonio (DATA_HORA_MODIFICACAO, ID_DEPARTAMENTO_TRANSF_FK, ID_PATRIMONIO_FK, DEPTO_ANTERIOR, ESTADO, LOCAL_ANTERIOR, OBS_ANTERIOR, PLAQUETA, ID_USUARIO_FK) VALUES ('2024-02-10 20:39:11.067284', 4, 1, 'Logística', 'BOM', 'Sala 01 - adm', 'Impressora esta na manutenção', 'AA000', 1);

-- INSERINDO DADOS NA TABELA DE REGISTRO DE BAIXA PATRIMONIAL
INSERT INTO tb_baixa_patrimonio (plaqueta, descricao, motivo, nome_profissional_baixa, cpf_profissional_baixa, data_baixa, id_usuario_fk, id_patrimonio_fk) VALUES ('PLQ040', 'Cafeteira Industrial', 'Teste sistema', 'JOAO', '123.456.789-00', '2024-02-01 20:36:38.970764', 1, 26)

/*http://localhost:8080/swagger-ui/index.html*/