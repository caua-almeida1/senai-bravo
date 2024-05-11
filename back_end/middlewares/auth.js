import jwt from 'jsonwebtoken'
import {promisify} from 'util'
import 'dotenv/config'

// Iniciando middleware
async function validarToken(req, res, next){

    const header = req.headers.authorization

    if (!header) {
        return res.json({
            error:true,
            mensagem:"Erro: Token não encontrado"
        })
    }

    const [bearer,token] = header.split(' ')


    if (!token) {
        return res.json({
            error:true,
            mensagem:"Erro: Necessário realizar o login"
        })
    }

    try {
        const decod = await promisify(jwt.verify)(token, process.env.SECRET)
        req.userId = decod.id
    
        return next()
    } catch (error){
        return res.json({
            error:true,
            mensagem:"Erro: Token invalido"
        })
    }
}

export default validarToken