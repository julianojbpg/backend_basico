import { iEndereco, iUsuario } from "../@types/iUsuario"
import prisma from "./prisma"

// Create
export async function cadastrarUsuarioNoBanco(usuario: Omit < iUsuario, 'endereco'>){
    try {
        const result = await prisma.usuario.create({
             data: usuario
         })
        return {result, mensagem:'Usuario cadastrado com sucesso!' }
        
    } catch (error) {
        return {error, mensagem:'Usuario não foi cadastrado com sucesso!' }
    }
}  

export async function cadastrarEnderecoNoBanco(endereco: Omit < iEndereco, 'id'>){
    try {
        const result = await prisma.endereco.create({
             data: endereco
         })
        return {result, mensagem:'Endereço cadastrado com sucesso!' }
        
    } catch (error) {
        return {error, mensagem:'Endereço não foi cadastrado com sucesso!' }
    }
}
// Delete
async function deletarUsuarioNoBanco(id:number) {
    const result = await prisma.usuario.delete({
        where:{
            id
        }
    })
}

// Read

export async function buscarUsuarioNoBanco(email? :string, cpf?:string) {
    if(!email  && !cpf){
        throw new Error("teste")
    }
    const result = await prisma.usuario.findFirst({
        where:{
            OR:[
                {email},
                {cpf}
            ].filter(Boolean)
        }
    })
    return result
}
