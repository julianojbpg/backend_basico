import { iUsuario } from "../@types/iUsuario"
import prisma from "./prisma"


export async function cadastrarUsuarioNoBanco(usuario: Omit < iUsuario, 'endereco'>){
    console.log('chegou aqui')
    // const result = await prisma.usuario.create({
    //     data: usuario
    // })
    // return result
    return {mensagem:'Chegou no banco os dados', usuario}
}   
