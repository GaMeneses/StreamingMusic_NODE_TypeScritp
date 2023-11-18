import { Request, Response } from 'express'
import dados from '../database/data'

const getAll = (req: Request, res: Response) => {
  res.json(dados.artistas)
}

const getArtista = (req: Request, res: Response) => {
  const artista = dados.artistas.find((a) => a.id === parseInt(req.params.id))
  if (!artista) {
    return res.status(404).json({ mensagem: 'Artista não encontrado' })
  }
  res.json(artista)
}

const addArtista = (req: Request, res: Response) => {
  const novoArtista = req.body
  novoArtista.id = dados.artistas.length + 1
  dados.artistas.push(novoArtista)
  res
    .status(201)
    .json({ mensagem: 'Artista criado com sucesso', artista: novoArtista })
}

const putArtista = (req: Request, res: Response) => {
  const artistaId = parseInt(req.params.id)
  const index = dados.artistas.findIndex((a) => a.id === artistaId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Artista não encontrado' })
  }

  dados.artistas[index] = { ...dados.artistas[index], ...req.body }
  res.status(200).json({
    mensagem: 'Artista atualizado com sucesso',
    artista: dados.artistas[index],
  })
}

const deleteArtista = (req: Request, res: Response) => {
  const artistaId = parseInt(req.params.id)
  const index = dados.artistas.findIndex((a) => a.id === artistaId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Artista não encontrado' })
  }

  if (dados.musicas.findIndex((m) => m.artista === artistaId) !== -1) {
    return res.status(404).json({
      mensagem: 'Artista não pode ser deletada, está associado a musica(s)!',
    })
  }

  const artistaRemovido = dados.artistas.splice(index, 1)[0]
  res.status(200).json({
    mensagem: 'Artista removido com sucesso',
    artista: artistaRemovido,
  })
}

export default {
  addArtista,
  getAll,
  getArtista,
  putArtista,
  deleteArtista,
}