import { iEndereco, iUsuario } from "../@types/iUsuario"
import * as yup from 'yup'

export async function validacaoCamposDoUsuario(usuario: iUsuario) {

    const result = yup.object({
        nome: yup.string().required('É obrigatorio preencher o campo nome!').min(3, 'Precisa de no minimo 3 caracteres no nome.'),
        email: yup.string().matches(/^[^\d\s@][^\s@]*@[^\s@.]+(\.[^\s@.]+)*\.[a-zA-Z]{2,3}$/, 'Email ínvalido!')
            .required('É obrigatorio preencher o campo email!'),
        senha: yup.string()
            .matches(/^(?=.*[A-Z])(?=.*[\W_])[^\s]{5,}$/, 'não pode haver espaço, pelo menos uma letra maiuscula e um caracter especial.')
            .min(5, "A senha precisa ter no minimo 5 caracteres"),
        cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Seu CPF esta invalido')
    })
    return await result.validate(usuario, { abortEarly: false })
}

export async function validacaoCamposDoEndereco(endereco: iEndereco) {
    const result = yup.object({
        rua: yup.string().required('É obrigatorio preencher o campo nome!'),
        cep: yup.string().matches(/^\d{5}-?\d{3}$/, 'CEP ínvalido'),
        numero: yup.number().required('É obrigatorio preencher o numero da residencia'),
        usuarioId: yup.number().required()
    })
    return await result.validate(endereco, { abortEarly: false })
}

function validacaoCPFouEmail(obj: Object) {
    // Verifica se o objeto não é nulo e é do tipo 'object'
    if (obj && typeof obj === 'object') {
        // Verifica se o objeto tem as propriedades 'cpf' ou 'email'
        return 'cpf' in obj || 'email' in obj
    } else
        return false // Retorna false se não for um objeto válido
}

export async function validacaoCampoCPFouEmail(obj: Object) {
    const validacao = validacaoCPFouEmail(obj)
    if (validacao) {
        const result = yup.object({
            email: yup.string().matches(/^[^\d\s@][^\s@]*@[^\s@.]+(\.[^\s@.]+)*\.[a-zA-Z]{2,3}$/, 'Email ínvalido!'),
            cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Seu CPF esta invalido')
        })
        return await result.validate(obj, { abortEarly: false })
    }
    return null
}

export function validacaoIDUsuario(obj: Object) {
    // Verifica se o objeto não é nulo e é do tipo 'object'
    if (obj && typeof obj === 'object') {
        return 'id' in obj
    } else
        return false // Retorna false se não for um objeto válido
}

export async function validar_Id_Usuario(obj: Object) {
    const validacao = validacaoIDUsuario(obj)
    if (validacao) {
        const result = yup.object({
            id: yup.number().required('o numero do ID precisa ser passado')
                .integer('O ID precisa ser um número inteiro')
        })
        return await result.validate(obj)
    }
    return null
}

function validacao_De_Atualizacao_Do_Usuario(obj: Object) {
    // Verifica se o objeto não é nulo e é do tipo 'object'
    if (obj && typeof obj === 'object') {
        return 'id' in obj && ('nome' in obj || 'senha' in obj)
    } else
        return false // Retorna false se não for um objeto válido
}

export async function validar_Atualizacao_Usuario(obj: Object) {
    const validacao = validacao_De_Atualizacao_Do_Usuario(obj)
    if (validacao) {
        const result = yup.object({
            nome: yup.string().required('É obrigatorio preencher o campo nome!').min(3, 'Precisa de no minimo 3 caracteres no nome.'),
            id: yup.number().required('o numero do ID precisa ser passado')
                .integer('O ID precisa ser um número inteiro'),
            senha: yup.string()
                .matches(/^(?=.*[A-Z])(?=.*[\W_])[^\s]{5,}$/, 'não pode haver espaço, pelo menos uma letra maiuscula e um caracter especial.')
                .min(5, "A senha precisa ter no minimo 5 caracteres")
        })
        return await result.validate(obj)
    }
    return null
}


