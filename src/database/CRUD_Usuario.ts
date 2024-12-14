import { iEndereco, iUsuario } from "../@types/iUsuario"
import prisma from "./prisma"


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
