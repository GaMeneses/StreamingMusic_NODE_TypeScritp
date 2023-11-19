import { Request, Response } from 'express'
import dados from '../database/data'

interface NovoMusica {
  id: number
  titulo: string
  artista: number
  duracao: string
}

const addMusica = (req: Request, res: Response) => {
  const { titulo, artista, duracao } = req.body as NovoMusica

  if (!titulo || !artista || !duracao) {
    return res.status(400).json({ mensagem: 'Título, artista e duração são campos obrigatórios' })
  }

  const novaMusica = { id: dados.musicas.length + 1, titulo, artista, duracao }
  dados.musicas.push(novaMusica)

  res.status(201).json({ mensagem: 'Música criada com sucesso', musica: novaMusica })
}

const getAll = (req: Request, res: Response) => {
  res.status(201).json({ mensagem: 'Música retornada com sucesso', musicas: dados.musicas })
}

const getMusica = (req: Request, res: Response) => {
  const musica = dados.musicas.find((m) => m.id === parseInt(req.params.id))
  if (!musica) {
    return res.status(404).json({ mensagem: 'Música não encontrada' })
  }
  res.json(musica)
}

const putMusica = (req: Request, res: Response) => {
  const musicaId = parseInt(req.params.id)
  const index = dados.musicas.findIndex((m) => m.id === musicaId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Música não encontrada' })
  }
  const { titulo, artista, duracao } = req.body as NovoMusica

  if (titulo) {
    dados.musicas[index].titulo = titulo
  }
  if (artista) {
    dados.musicas[index].artista = artista
  }

  if (duracao) {
    dados.musicas[index].duracao = duracao
  }

  res.status(200).json({
    mensagem: 'Música atualizada com sucesso',
    musica: dados.musicas[index],
  })
}

const deleteMusica = (req: Request, res: Response) => {
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
  res.status(200).json({ mensagem: 'Música removida com sucesso', musica: musicaRemovida })
}

const obterMusicasPaginadas = (req: Request, res: Response) => {
  const pagina = parseInt(req.query.pagina as string, 10) || 1 // Página atual, padrão para 1
  const itensPorPagina = parseInt(req.query.itensPorPagina as string, 10) || 10 // Itens por página, padrão para 10

  const inicioIndice = (pagina - 1) * itensPorPagina
  const fimIndice = inicioIndice + itensPorPagina

  const musicasPaginadas = dados.musicas.slice(inicioIndice, fimIndice)

  res.json({
    mensagem: 'Músicas obtidas com sucesso (com paginação)',
    paginaAtual: pagina,
    itensPorPagina: itensPorPagina,
    totalItens: dados.musicas.length,
    musicas: musicasPaginadas,
  })
}

const obterMusicasFiltradas = (req: Request, res: Response) => {
  let musicasFiltradas = [...dados.musicas]

  // Aplicar filtros se existirem
  const { artista, duracao, titulo } = req.query

  if (artista) {
    const artistaId = parseInt(artista as string, 10)
    musicasFiltradas = musicasFiltradas.filter((musica) => musica.artista === artistaId)
  }

  if (duracao) {
    musicasFiltradas = musicasFiltradas.filter((musica) => musica.duracao === duracao)
  }

  if (titulo) {
    musicasFiltradas = musicasFiltradas.filter((musica) => musica.titulo.startsWith(titulo as string))
  }

  res.json({
    mensagem: 'Músicas obtidas com sucesso (com filtros)',
    musicas: musicasFiltradas,
  })
}

const ordenarMusicasPorTitulo = (req: Request, res: Response) => {
  const musicasCopia = [...dados.musicas]
  musicasCopia.sort()

  res.json({
    mensagem: 'Musicas obtidas com sucesso (ordenados)',
    musicas: musicasCopia.sort((a, b) => a.titulo.localeCompare(b.titulo)),
  })
}

export default {
  addMusica,
  getAll,
  getMusica,
  putMusica,
  deleteMusica,
  obterMusicasPaginadas,
  obterMusicasFiltradas,
  ordenarMusicasPorTitulo,
}
