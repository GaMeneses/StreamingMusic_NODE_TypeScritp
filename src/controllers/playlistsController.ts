import { Request, Response } from 'express'
import dados from '../database/data'

const getAll = (req: Request, res: Response) => {
  res.json(dados.playlists)
}

const getPlaylist = (req: Request, res: Response) => {
  const playlist = dados.playlists.find((p) => p.id === parseInt(req.params.id))
  if (!playlist) {
    return res.status(404).json({ mensagem: 'Playlist não encontrada' })
  }
  res.json(playlist)
}

const addPlaylist = (req: Request, res: Response) => {
  const novaPlaylist = req.body

  const ids = verificaMusicasNaoExistem(novaPlaylist.musicas)

  if (ids.length > 0) {
    return res.status(404).json({
      mensagem: 'Não foi possível criar a playList, essa(s) musica(s) não existem!',
      musicas: ids,
    })
  }

  novaPlaylist.id = dados.playlists.length + 1
  dados.playlists.push(novaPlaylist)
  res.status(201).json({ mensagem: 'Playlist criada com sucesso', playlist: novaPlaylist })
}

const addMusica = (req: Request, res: Response) => {
  const playlistId = parseInt(req.params.id)
  const novasMusicas = req.body
  const index = dados.playlists.findIndex((p) => p.id === playlistId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Playlist não encontrada' })
  }

  let ids = verificaMusicasNaoExistem(novasMusicas.musicas)

  if (ids.length > 0) {
    return res.status(404).json({
      mensagem: 'Não foi possível inserir na playList, essa(s) musica(s) não existe(m)!',
      musicas: ids,
    })
  }

  ids = verificaMusicasDaListaAtual(novasMusicas.musicas, dados.playlists[index].musicas)

  if (ids.length > 0) {
    return res.status(404).json({
      mensagem: 'Não foi possível inserir na playList, essa(s) musica(s) já existe(m)!',
      musicas: ids,
    })
  }

  novasMusicas.musicas.forEach((id: number) => {
    dados.playlists[index].musicas.push(id)
  })

  res.status(201).json({
    mensagem: 'Musicas inseridas na playlist',
    playlist: dados.playlists[index],
  })
}

const putPlaylist = (req: Request, res: Response) => {
  const playlistId = parseInt(req.params.id)
  const index = dados.playlists.findIndex((p) => p.id === playlistId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Playlist não encontrada' })
  }

  dados.playlists[index] = { ...dados.playlists[index], ...req.body }
  res.status(200).json({
    mensagem: 'Playlist atualizada com sucesso',
    playlist: dados.playlists[index],
  })
}

const deletePlaylist = (req: Request, res: Response) => {
  const playlistId = parseInt(req.params.id)
  const index = dados.playlists.findIndex((p) => p.id === playlistId)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Playlist não encontrada' })
  }

  const playlistRemovida = dados.playlists.splice(index, 1)[0]
  res.status(200).json({
    mensagem: 'Playlist removida com sucesso',
    playlist: playlistRemovida,
  })
}

const deleteMusica = (req: Request, res: Response) => {
  const playlistId = parseInt(req.params.id)
  const musicaId = parseInt(req.params.musica)
  const playlist = dados.playlists.find((p) => p.id === playlistId)

  if (!playlist) {
    return res.status(404).json({ mensagem: 'Playlist não encontrada' })
  }

  const indice = playlist.musicas.indexOf(musicaId)

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'musica não encontrada na playlist' })
  }

  const musicaRemovida = playlist.musicas.splice(indice, 1)

  res.status(200).json({
    mensagem: 'Musica removida da playlist com sucesso',
    musica: musicaRemovida,
  })
}

const obterPlaylistsPaginadas = (req: Request, res: Response) => {
  const pagina = parseInt(req.query.pagina as string, 10) || 1 // Página atual, padrão para 1
  const itensPorPagina = parseInt(req.query.itensPorPagina as string, 10) || 10 // Itens por página, padrão para 10

  const inicioIndice = (pagina - 1) * itensPorPagina
  const fimIndice = inicioIndice + itensPorPagina

  const playlistsPaginadas = dados.playlists.slice(inicioIndice, fimIndice)

  res.json({
    mensagem: 'Playlists obtidas com sucesso (com paginação)',
    paginaAtual: pagina,
    itensPorPagina: itensPorPagina,
    totalItens: dados.playlists.length,
    playlist: playlistsPaginadas,
  })
}

const obterPlaylistsFiltrados = (req: Request, res: Response) => {
  let playlistsFiltradas = [...dados.playlists]

  // Aplicar filtros se existirem
  const { nome } = req.query

  if (nome) {
    playlistsFiltradas = dados.playlists.filter((playlist) => playlist.nome.startsWith(nome as string))
  }

  res.json({
    mensagem: 'Playlists obtidos com sucesso (com filtros)',
    musicas: playlistsFiltradas,
  })
}

function verificaMusicasNaoExistem(listaIds: number[]) {
  const naoExiste: number[] = []

  listaIds.forEach((id) => {
    if (dados.musicas.findIndex((m) => m.id === id) === -1) naoExiste.push(id)
  })

  return naoExiste
}

function verificaMusicasDaListaAtual(novalista: number[], listaMusicas: number[]) {
  const existe: number[] = []

  novalista.forEach((id: number) => {
    if (listaMusicas.includes(id)) existe.push(id)
  })

  return existe
}

const ordenarPlaylistPorNome = (req: Request, res: Response) => {
  const playlistsCopia = [...dados.playlists]
  playlistsCopia.sort()

  res.json({
    mensagem: 'Playlists obtidas com sucesso (ordenadas)',
    playlists: playlistsCopia.sort((a, b) => a.nome.localeCompare(b.nome)),
  })
}

export default {
  addPlaylist,
  getAll,
  getPlaylist,
  putPlaylist,
  deletePlaylist,
  addMusica,
  deleteMusica,
  obterPlaylistsPaginadas,
  obterPlaylistsFiltrados,
  ordenarPlaylistPorNome,
}
