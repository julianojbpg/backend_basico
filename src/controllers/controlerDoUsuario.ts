import {Request , Response} from 'express'
import { validacaoCamposDoUsuario } from '../validations/validateUser'
import yup from 'yup'
import { cadastrarUsuarioNoBanco } from '../database/CRUD_Usuario'
import { iUsuario } from '../@types/iUsuario'


export async function cadastroDoUsuario( req:Request, res:Response ) {
    try {
        const usuario = await validacaoCamposDoUsuario(req.body) as iUsuario
            const result = await cadastrarUsuarioNoBanco(usuario)
            return res.status(200).json(result)
        }
    catch (error) {
        if(error instanceof yup.ValidationError)
            return res.status(200).json(error.errors)
        return res.status(200).json(error)  
    }
}