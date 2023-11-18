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

export default { gerarToken, verificarToken }
