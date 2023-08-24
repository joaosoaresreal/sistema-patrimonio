/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/SQLTemplate.sql to edit this template
 */
/**
 * Author:  06727343110
 * Created: 11 de ago. de 2023
 */

/*INSERINDO DADOS NA TABELA DE EMPRESA*/
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('34.614.517/0001-92', 'JB Software', '(67) 99965-9658', 'jbsoftware@gmail.com', 'R. Rio de Janeiro, 191, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('15.482.854/0001-29', 'Canaa', '(67) 99658-5453', 'canaa@gmail.com', 'Av. Amelia Fukuda, 374, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('21.352.120/0001-28', 'Linda Store', '(67) 98548-6587', 'lindastore@gmail.com', 'Av. Bataguassu, 123, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('34.614.517/0001-92', 'JB Software', '(67) 98888-5555', 'jbsoftware@gmail.com', 'Av. Dourados, 123, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('94.420.283/0001-74', 'Point Pizzaria', '(67) 98255-4587', 'pointpizzaria@gmail.com', 'Av. Campo Grande, 123, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('61.382.751/0001-04', 'The Best', '(67) 98332-5954', 'thebest@gmail.com', 'Av. Campo Grande, 33, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('15.426.316/0001-17', 'Bless', '(67) 98835-5857', 'bless@gmail.com', 'Av. Alagoas, 253, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('18.904.986/0001-90', 'Atrevida', '(67) 99635-2521', 'atrevida@gmail.com', 'Av. Alagosd, 158, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('64.057.224/0001-12', 'Magazine Luiza', '(67) 98322-5896', 'magalu@gmail.com', 'Av. Weimar Gonçalves Torres, 2587, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('75.580.777/0001-71', 'Chiquinho', '(67) 98525-3265', 'chiquinho@gmail.com', 'Av. Weimar Gonçalves Torres, 163, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('98.475.491/0001-21', 'Store', '(67) 98251-3698', 'Store@gmail.com', 'Av. João , 568, Centro, Naviraí-MS');
INSERT INTO TB_empresa (cnpj, nome_fantasia, telefone, email, endereco) VALUES ('34.614.517/0001-92', 'Vivo', '(67) 98585-6589', 'vivo@gmail.com', 'Av. Maravilhas , 354, Centro, Naviraí-MS');

/*INSERINDO DADOS NA TABELA USUARIO*/
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_empresa_fk) VALUES ('Samara Sudano', '123.456.789-00', '(67) 98787-6565', '', 'samara@jssoftware.com.br', '12345678', 1)
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_empresa_fk) VALUES ('Rosana Caldeiras', '032.165.549-87', '(67) 98522-9175', '', 'rosana@jssoftware.com.br', '12345678', 5)
INSERT INTO TB_usuario (nome, cpf, telefone, foto, email, senha, id_empresa_fk) VALUES ('João Soares', '147.852.000-00', '(67) 99809-6541', '', 'joao@jssoftware.com.br', '12345678', 2)

/*INSERINDO DADOS NA TABELA DEPARTAMENTO*/
INSERT INTO TB_departamento (nome, telefone, email, endereco) VALUES ('Administrativo', '(67) 3409-5542', 'administrativo@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro');
INSERT INTO TB_departamento (nome, telefone, email, endereco) VALUES ('Gerencia', '(67) 3409-5512', 'gerencia@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro');
INSERT INTO TB_departamento (nome, telefone, email, endereco) VALUES ('Suporte', '(67) 3409-5501', 'suporte@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro');
INSERT INTO TB_departamento (nome, telefone, email, endereco) VALUES ('Recepcao', '(67) 3409-5500', 'recepcao@jssoftware.com.br', 'Avenida Amélia Fukuda, 374 - Centro');

/*INSERINDO DADOS NA TABELA PATRIMONIO*/
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA000', 'Impressora HP', 'BOM', 'Sala 01 - adm', '2023-06-22T21:44:00', 'Impressora esta na manutenção', 1);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA111', 'Maquina de Tatilografar', 'BOM', 'Sala Gerencia - 2º Piso', '2000-06-22T21:44:00', '', 2);
INSERT INTO TB_patrimonio(plaqueta, descricao, estado, localizacao, data_entrada, observacao, id_departamento_fk) VALUES ('AA222', 'Computador Dell - Core i3 5ª Geração', 'EXCELENTE', 'Recepcao - Balcao', '2021-06-22T21:44:00', 'Mouse foi substituido por um HP', 4);
