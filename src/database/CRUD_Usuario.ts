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
export async function deletarUsuarioNoBanco(id: number): Promise<iStatus> {
    try {   
        await prisma.usuario.delete({
            where: {
                id
            }
        })
        return { status: true, mensagem: 'Usuario Deletado com sucesso' }
    } catch (error) {
        return { status: false, mensagem: `Erro ao deletar o usuario no banco` }
    }
}

// Read

export async function buscarUsuarioNoBanco(email?: string, cpf?: string): Promise<iStatus> {
    if (!email && !cpf) {
        return { status: false, mensagem: 'erro nos parametros' }
    }
    try {
        const result = await prisma.usuario.findFirst({
            where: {
                OR: [
                    { email },
                    { cpf }
                ].filter(Boolean)
            }
        })
        return { status: true, valor: result, mensagem: 'Usuario encontrado com sucesso!' }    
    } catch (error) {
        return { status: false, mensagem: error }
    }
}

export async function buscarTodosUsuariosNoBanco() {
    try {
        const result = await prisma.usuario.findMany()
        return { status: true, valor: result, mensagem: 'Todos os usuarios encontrados com sucesso!' }
    } catch (error) {
        return { status: false, mensagem: 'erro ao encontrar todos os usuarios!' }
    }
}
// Update

export async function atualizarUsuarioNoBanco(usuario:iUsuario): Promise<iStatus> {
    const {id , nome, senha} = usuario
    try {
        await prisma.usuario.update({
            where:{
                id
            },
            data:{
                nome,
                senha
            }
        })
        return { status: true, mensagem: 'O usuario foi atualizado com sucesso!' }
    } catch (error) {
        return { status: true, mensagem: 'O usuario não foi atualizado com sucesso!' }
    }
}

export async function deletarEnderecoNoBanco(usuarioId: number): Promise<iStatus> {
    try {
        await prisma.endereco.delete({
           where:{
                usuarioId
           }
        })
        return { status: true, mensagem: 'O endreço foi deletado com sucesso!' }
    } catch (error) {
        return { status: true, mensagem: 'O endereço não foi deletado com sucesso!' }
    }
}