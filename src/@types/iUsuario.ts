export interface iUsuario{
    id: number
    nome: string
    email: string
    senha: string
    cpf: string
    endereco?: iEndereco | number
}

export interface iEndereco{
    id: number
    rua: string
    cep: string
    numero: number
    usuarioId: number
}