/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/SQLTemplate.sql to edit this template
 */
/**
 * Author:  06727343110
 * Created: 11 de ago. de 2023
 */

/*INSERINDO DADOS NA TABELA DE ROLE*/
INSERT INTO TB_ROLE (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO TB_ROLE (authority) VALUES ('ROLE_ADMIN');

/*INSERINDO DADOS NA TABELA DE EMPRESA*/
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('34.614.517/0001-92', 'JB Software', '(67) 99965-9658', 'jbsoftware@gmail.com', 'R. Rio de Janeiro, 191, Centro, Naviraí-MS');

/*INSERINDO DADOS NA TABELA DEPARTAMENTO*/
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Administrativo', '(67) 3409-5542', 'administrativo@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Gerencia', '(67) 3409-5512', 'gerencia@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Suporte', '(67) 3409-5501', 'suporte@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro', 1);
INSERT INTO TB_departamento (nome, telefone, email, endereco, id_empresa_fk) VALUES ('Recepcao', '(67) 3409-5500', 'recepcao@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro', 1);

/*INSERINDO DADOS NA TABELA USUARIO*/
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Samara Sudano', '123.456.789-00', '(67) 98787-6565', '', 'samara@jssoftware.com.br', '12345678', 1)
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('Rosana Caldeiras', '032.165.549-87', '(67) 98522-9175', '', 'rosana@jssoftware.com.br', '12345678', 4)
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_departamento_fk) VALUES ('João Soares', '147.852.000-00', '(67) 99809-6541', '', 'joao@jssoftware.com.br', '12345678', 2)

/*INSERINDO DADOS NA TABELA USUARIO*/
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (1, 1);
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (2, 1);
INSERT INTO TB_usuario_role (usuario_id, role_id) VALUES (3, 2);

/*INSERINDO DADOS NA TABELA PATRIMONIO*/
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA000', 'Impressora HP', 'BOM', 'Sala 01 - adm', '2023-06-22', 'Impressora esta na manutenção', 1);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA111', 'Maquina de Tatilografar', 'BOM', 'Sala Gerencia - 2º Piso', '2000-06-22', '', 2);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA222', 'Computador Dell - Core i3 5ª Geração', 'EXCELENTE', 'Recepcao - Balcao', '2021-06-22', 'Mouse foi substituido por um HP', 4);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA333', 'Computador Acer - Core i7 5ª Geração', 'EXCELENTE', 'Recepcao - Balcao', '2021-06-22', 'AAAAA', 4);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA444', 'Computador Lenovo - Intel Celeron', 'BOM', 'Recepcao - Balcao', '2021-06-22', 'AAA', 4);

/*http://localhost:8080/swagger-ui/index.html*/