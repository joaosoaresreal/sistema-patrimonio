/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/SQLTemplate.sql to edit this template
 */
/**
 * Author:  06727343110
 * Created: 11 de ago. de 2023
 */

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
--INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Samara Sudano', '123.456.789-00', '(67) 98787-6565', '', 'samara@jssoftware.com.br', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 1)
--INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Rosana Caldeiras', '032.165.549-87', '(67) 98522-9175', '', 'rosana@jssoftware.com.br', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 4)
--INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('João Soares', '147.852.000-00', '(67) 99809-6541', '', 'joao@jssoftware.com.br', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 2)
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('João Silva', '123.456.789-01', '(11) 1234-5678', NULL, 'joao@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 1);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Maria Oliveira', '234.567.890-12', '(22) 2345-6789', NULL, 'maria@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 2);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Carlos Santos', '345.678.901-23', '(33) 3456-7890', NULL, 'carlos@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 3);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Ana Pereira', '456.789.012-34', '(44) 4567-8901', NULL, 'ana@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 4);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Pedro Costa', '567.890.123-45', '(55) 5678-9012', NULL, 'pedro@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 5);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Lucia Lima', '678.901.234-56', '(66) 6789-0123', NULL, 'lucia@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 6);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Fernando Oliveira', '789.012.345-67', '(77) 7890-1234', NULL, 'fernando@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 7);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Mariana Silva', '890.123.456-78', '(88) 8901-2345', NULL, 'mariana@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 8);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Gabriel Santos', '901.234.567-89', '(99) 9012-3456', NULL, 'gabriel@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 9);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Isabela Costa', '012.345.678-90', '(10) 0123-4567', NULL, 'isabela@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 10);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Rafael Oliveira', '123.234.567-01', '(11) 1234-5678', NULL, 'rafael@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 1);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Amanda Pereira', '234.345.678-12', '(22) 2345-6789', NULL, 'amanda@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 2);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Gustavo Costa', '345.456.789-23', '(33) 3456-7890', NULL, 'gustavo@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 3);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Larissa Lima', '456.567.890-34', '(44) 4567-8901', NULL, 'larissa@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 4);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Vinicius Silva', '567.678.901-45', '(55) 5678-9012', NULL, 'vinicius@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 5);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Camila Oliveira', '678.789.012-56', '(66) 6789-0123', NULL, 'camila@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 6);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Eduardo Santos', '789.890.123-67', '(77) 7890-1234', NULL, 'eduardo@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 7);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Juliana Costa', '890.901.234-78', '(88) 8901-2345', NULL, 'juliana@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 8);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Roberto Lima', '901.012.345-89', '(99) 9012-3456', NULL, 'roberto@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 9);
INSERT INTO tb_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Patricia Silva', '012.123.456-90', '(10) 0123-4567', NULL, 'patricia@email.com', '$2a$10$gjioWp70kHvK48.XARyckODVTer.V0tpNlPYikZr.y9f4Rs2jLBni', 10);

--INSERINDO DADOS NA TABELA ROLE
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (1, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (2, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (3, 2); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (4, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (5, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (6, 2); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (7, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (8, 2); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (9, 2);
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (10, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (11, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (12, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (13, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (14, 2); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (15, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (16, 2); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (17, 1);
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (18, 1); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (19, 2); 
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (20, 2);

--INSERINDO DADOS NA TABELA PATRIMONIO
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA000', 'Impressora HP', 'BOM', 'Sala 01 - adm', '2023-06-22', 'Impressora esta na manutenção', 1);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA111', 'Maquina de Datilografar', 'BOM', 'Sala Gerencia - 2º Piso', '2000-06-22', '', 2);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA222', 'Computador Dell - Core i3 5ª Geração', 'EXCELENTE', 'Recepcao - Balcao', '2021-06-22', 'Mouse foi substituido por um HP', 4);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA333', 'Computador Acer - Core i7 5ª Geração', 'EXCELENTE', 'Recepcao - Balcao', '2021-06-22', 'AAAAA', 4);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA444', 'Computador Lenovo - Intel Celeron', 'BOM', 'Recepcao - Balcao', '2021-06-22', 'AAA', 4);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ001', 'Computador Dell', 'BOM', 'Sala 101', '2023-01-01', 'Nenhum', 1);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ002', 'Mesa de Escritório', 'EXCELENTE', 'Escritório Principal', '2023-01-02', 'Alguns arranhões', 2);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ003', 'Projetor Epson', 'BOM', 'Sala de Reuniões', '2023-01-03', 'Com controle remoto', 3);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ004', 'Cadeira Ergonômica', 'BOM', 'Sala de Trabalho', '2023-01-04', 'Ajustável em altura', 4);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ005', 'Impressora HP', 'DANIFICADO', 'Almoxarifado', '2023-01-05', 'Baixa de toner', 5);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ006', 'Ar Condicionado', 'EXCELENTE', 'Sala 102', '2023-01-06', 'Manutenção recente', 6);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ007', 'Notebook Lenovo', 'BOM', 'Sala de Treinamento', '2023-01-07', 'Com adaptador HDMI', 7);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ008', 'Estante de Livros', 'DANIFICADO', 'Biblioteca', '2023-01-08', 'Algumas prateleiras quebradas', 8);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ009', 'Telefone VoIP', 'BOM', 'Recepção', '2023-01-09', 'Com viva-voz', 9);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ010', 'Quadro Branco', 'EXCELENTE', 'Sala de Aula 1', '2023-01-10', 'Com marcadores', 10);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ011', 'Caixa de Som Bluetooth', 'BOM', 'Área de Convivência', '2023-01-11', 'Com bateria recarregável', 1);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ012', 'Máquina de Café', 'EXCELENTE', 'Cafeteria', '2023-01-12', 'Funcionando perfeitamente', 2);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ031', 'Monitor LG', 'BOM', 'Sala 201', '2023-01-31', 'Resolução Full HD', 3);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ032', 'Projetor BenQ', 'EXCELENTE', 'Sala de Conferência', '2023-02-01', 'Projeção de alta qualidade', 4);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ033', 'Cadeira de Escritório', 'BOM', 'Sala de Trabalho', '2023-02-02', 'Acolchoada e confortável', 5);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ034', 'Impressora Epson', 'DANIFICADO', 'Almoxarifado', '2023-02-03', 'Problema no alimentador de papel', 6);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ035', 'Ar Condicionado', 'EXCELENTE', 'Sala 103', '2023-02-04', 'Recentemente limpo e revisado', 7);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ036', 'Notebook HP', 'BOM', 'Sala de Treinamento', '2023-02-05', 'Windows 10 instalado', 8);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ037', 'Estante de DVDs', 'DANIFICADO', 'Biblioteca', '2023-02-06', 'Prateleiras soltas', 9);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ038', 'Telefone Fixo', 'BOM', 'Recepção', '2023-02-07', 'Linha direta com ramais internos', 10);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ039', 'Quadro Magnético', 'EXCELENTE', 'Sala de Aula 2', '2023-02-08', 'Ideal para anotações', 1);
INSERT INTO tb_patrimonio (plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('PLQ040', 'Cafeteira Industrial', 'BOM', 'Cafeteria', '2023-02-09', 'Prepara café em grande quantidade', 2);

-- INSERINDO DADOS NA TABELA DE REGISTRO DAS TRANSFERENCIA PATRIMONIAL
INSERT INTO tb_transfere_patrimonio(data_criacao, data_hora_modificacao, id_patrimonio_fk, criado_por, descricao_anterior, estado_anterior, modificado_por, obs_anterior, plaqueta) VALUES ('', '', 1, 'Usuário Teste', 'Teste 1 Sistema Transferencia', 'BOM', 'Usuário Teste', 'Teste 1 Sistema Transferencia', 'AA000');
INSERT INTO tb_transfere_patrimonio(data_criacao, data_hora_modificacao, id_patrimonio_fk, criado_por, descricao_anterior, estado_anterior, modificado_por, obs_anterior, plaqueta) VALUES ('', '', 2, 'Usuário Teste', 'Teste 2 Sistema Transferencia', 'EXCELENTE', 'Usuário Teste', 'Teste 2 Sistema Transferencia', 'AA111');
INSERT INTO tb_transfere_patrimonio(data_criacao, data_hora_modificacao, id_patrimonio_fk, criado_por, descricao_anterior, estado_anterior, modificado_por, obs_anterior, plaqueta) VALUES ('', '', 3, 'Usuário Teste', 'Teste 3 Sistema Transferencia', 'BOM', 'Usuário Teste', 'Teste 3 Sistema Transferencia', 'AA222');
INSERT INTO tb_transfere_patrimonio(data_criacao, data_hora_modificacao, id_patrimonio_fk, criado_por, descricao_anterior, estado_anterior, modificado_por, obs_anterior, plaqueta) VALUES ('', '', 4, 'Usuário Teste', 'Teste 4 Sistema Transferencia', 'BOM', 'Usuário Teste', 'Teste 4 Sistema Transferencia', 'AA333');
INSERT INTO tb_transfere_patrimonio(data_criacao, data_hora_modificacao, id_patrimonio_fk, criado_por, descricao_anterior, estado_anterior, modificado_por, obs_anterior, plaqueta) VALUES ('', '', 5, 'Usuário Teste', 'Teste 5 Sistema Transferencia', 'DANIFICADO', 'Usuário Teste', 'Teste 5 Sistema Transferencia', 'AA444');

/*http://localhost:8080/swagger-ui/index.html*/