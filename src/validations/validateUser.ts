import { iUsuario } from "../@types/iUsuario"
import * as yup from 'yup'

export async function validacaoCamposDoUsuario(usuario:iUsuario) {
 
    const result = yup.object({
        nome: yup.string().required('É obrigatorio preencher o campo nome!').min(3,'Precisa de no minimo 3 caracteres no nome.'),
        email: yup.string().matches(/^[^\d\s@][^\s@]*@[^\s@.]+(\.[^\s@.]+)*\.[a-zA-Z]{2,3}$/, 'Email ínvalido!').required('É obrigatorio preencher o campo email!'),
        senha: yup.string().matches(/^(?=.*[A-Z])(?=.*[\W_])[^\s]{5,}$/, 'não pode haver espaço, pelo menos uma letra maiuscula e um caracter especial.')
        .min(5, "A senha precisa ter no minimo 5 caracteres"),
        cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Seu CPF esta invalido')
    })

    return await result.validate(usuario,{abortEarly: false})
}