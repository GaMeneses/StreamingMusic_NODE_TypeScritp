import { Request, Response } from 'express'
import dados from '../database/data'

const addMusic = (req: Request, res: Response) => {
  const novaMusica = req.body
  novaMusica.id = dados.musicas.length + 1

  dados.musicas.push(novaMusica)
  res
    .status(201)
    .json({ mensagem: 'Música criada com sucesso', musica: novaMusica })
}

const getAll = (req: Request, res: Response) => {
  res
    .status(201)
    .json({ mensagem: 'Música criada com sucesso', musicas: dados.musicas })
}

const getMusic = (req: Request, res: Response) => {
  const musica = dados.musicas.find((m) => m.id === parseInt(req.params.id))
  if (!musica) {
    return res.status(404).json({ mensagem: 'Música não encontrada' })
  }
  res.json(musica)
}

const putMusic = (req: Request, res: Response) => {
  const musicaId = parseInt(req.params.id)
  const index = dados.musicas.findIndex((m) => m.id === musicaId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Música não encontrada' })
  }

  dados.musicas[index] = { ...dados.musicas[index], ...req.body }
  res.status(200).json({
    mensagem: 'Música atualizada com sucesso',
    musica: dados.musicas[index],
  })
}

const deleteMusic = (req: Request, res: Response) => {
  const musicaId = parseInt(req.params.id)
  const index = dados.musicas.findIndex((m) => m.id === musicaId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Música não encontrada' })
  }

  if (dados.playlists.findIndex((p) => p.musicas.includes(musicaId)) !== -1) {
    return res.status(404).json({
      mensagem: 'Música não pode ser deletada, está associado a playlist(s)!',
    })
  }

  const musicaRemovida = dados.musicas.splice(index, 1)[0]
  res
    .status(200)
    .json({ mensagem: 'Música removida com sucesso', musica: musicaRemovida })
}

export default {
  addMusic,
  getAll,
  getMusic,
  putMusic,
  deleteMusic,
}
