import { Request, Response } from 'express'
import dados from '../database/data'
import gerarToken from '../Util/Token'

interface NovoUsuario {
  id: number // O id pode ser opcional para o método addUsuario
  login: string
  password: string
}
const login = (req: Request, res: Response) => {
  const { login, password } = req.body as NovoUsuario

  // Validar a presença dos campos obrigatórios
  if (!login || !password) {
    return res.status(400).json({ mensagem: 'Login e senha são campos obrigatórios' })
  }

  const usuarioAutenticado = verificarAcesso(login, password)
  if (usuarioAutenticado) {
    const token = gerarToken.gerarToken(usuarioAutenticado)
    return res.json({ token })
  }

  return res.status(401).json({ mensagem: 'Login ou senha incorretos!' })
}

const addUsuario = (req: Request, res: Response) => {
  const { login, password } = req.body as NovoUsuario

  // Validar presença do campo 'login' e 'password'
  if (!login || !password) {
    return res.status(400).json({ mensagem: 'Login e senha são campos obrigatórios' })
  }

  const novoUsuario: NovoUsuario = {
    id: dados.usuarios.length + 1,
    login,
    password,
  }

  dados.usuarios.push(novoUsuario)

  res.status(201).json({ mensagem: 'Usuário criado com sucesso', usuario: novoUsuario })
}

const putUsuario = (req: Request, res: Response) => {
  const usuarioId = parseInt(req.params.id)
  const index = dados.usuarios.findIndex((u) => u.id === usuarioId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' })
  }

  const { login, password } = req.body as NovoUsuario

  if (login) dados.usuarios[index].login = login
  if (password) dados.usuarios[index].password = password

  res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', usuario: dados.usuarios[index] })
}

const deleteUsuario = (req: Request, res: Response) => {
  const usuarioId = parseInt(req.params.id)
  const index = dados.usuarios.findIndex((u) => u.id === usuarioId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' })
  }

  const usuarioRemovido = dados.usuarios.splice(index, 1)[0]
  res.status(200).json({ mensagem: 'Usuário removido com sucesso', usuario: usuarioRemovido })
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
  addUsuario,
  putUsuario,
  deleteUsuario,
}
