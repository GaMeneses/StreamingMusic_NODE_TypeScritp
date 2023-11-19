import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface DadosUsuario {
  login: string
  password: string
}

const gerarToken = (dadosUsuario: DadosUsuario) => {
  return jwt.sign(dadosUsuario, 'WebServices', { expiresIn: '1h' })
}

const verificarToken = (token: string) => {
  try {
    return jwt.verify(token, 'WebServices')
  } catch (erro) {
    throw new Error('Token inválido')
  }
}

const autenticarMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ mensagem: 'Token de autenticação ausente' })
  }

  try {
    const usuarioAutenticado = verificarToken(token.replace('Bearer ', ''))
    req.body.usuarioAutenticado = usuarioAutenticado
    next()
  } catch (erro) {
    return res.status(403).json({ mensagem: 'Token de autenticação inválido' })
  }
}

export default { gerarToken, autenticarMiddleware }
