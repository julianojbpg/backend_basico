import { iStatus } from "../@types/iStatus"
import { iEndereco, iUsuario } from "../@types/iUsuario"
import prisma from "./prisma"

// Create
export async function cadastrarUsuarioNoBanco(usuario: Omit<iUsuario, 'endereco'>): Promise<iStatus> {
    try {
        const result = await prisma.usuario.create({
            data: usuario
        })
        return { status: true, valor: result, mensagem: 'Usuario cadastrado com sucesso!' }

    } catch (error) {
        return { status: false, mensagem: error }
    }
}

export async function cadastrarEnderecoNoBanco(endereco: Omit<iEndereco, 'id'>): Promise<iStatus> {
    try {
        const result = await prisma.endereco.create({
            data: endereco
        })
        return { status: true, valor: result, mensagem: 'Endereço cadastrado com sucesso!' }

    } catch (error) {
        return { status: false, mensagem: error }
    }
}
// Delete
async function deletarUsuarioNoBanco(id: number) {
    const result = await prisma.usuario.delete({
        where: {
            id
        }
    })
}

// Read

export async function buscarUsuarioNoBanco(email?: string, cpf?: string): Promise<iStatus> {
    if (!email && !cpf) {
        return { status: false, mensagem: 'erro nos parametros' }
    }
    
    const result = await prisma.usuario.findFirst({
        where: {
            OR: [
                { email },
                { cpf }
            ].filter(Boolean)
        }
    })
    return { status: true, valor: result, mensagem: 'Usuario encontrado com sucesso!' }
}
