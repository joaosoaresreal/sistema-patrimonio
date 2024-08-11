
// export const usuariosValidos = [
//     { id: 1, nome: "Administrador", usuario: "sstech@sstech.com.br", senha: "ifms12345678", role: "admin" },
//     { id: 2, nome: "Samara Sudano", usuario: "samara.sudano@sstech.com.br", senha: "12345678ifms", role: "admin" },
//     { id: 3, nome: "João Soares", usuario: "joao@sstech.com.br", senha: "1234ifms", role: "user" },
//     { id: 4, nome: "User Teste", usuario: "a", senha: "1", role: "user"},
//     { id: 5, nome: "Admin Teste", usuario: "b", senha: "1", role: "admin"}
// ];

export interface LoginUsuarioDto{
    email: String,
    senha: String
}