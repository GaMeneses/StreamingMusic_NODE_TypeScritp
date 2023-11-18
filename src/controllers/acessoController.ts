import { Request, Response } from 'express'
import dados from '../database/data'
import gerarToken from '../Util/Token'

const login = (req: Request, res: Response) => {
  const usuario = req.body

  const usuarioAutenticado = verificarAcesso(usuario.login, usuario.password)
  if (usuarioAutenticado) {
    const token = gerarToken.gerarToken(usuarioAutenticado)
    return res.json({ token })
  }

  return res.status(401).json({ mensagem: 'Login ou senha incorretos!' })
}

const verificarAcesso = (login: string, password: string) => {
  const usuario = dados.usuarios.find((usu) => usu.login === login && usu.password === password)

  if (usuario) {
    return usuario
  } else {
    return null
  }
}

export default {
  login,
}
