const usuarios = [{ id: 1, login: 'admin', password: 'admin' }]

const musicas = [
  { id: 1, titulo: 'Música 1', artista: 1, duracao: '4:30' },
  { id: 2, titulo: 'Música 2', artista: 2, duracao: '3:45' },
  { id: 3, titulo: 'Música 3', artista: 2, duracao: '3:45' },
  { id: 4, titulo: 'Música 4', artista: 2, duracao: '3:45' },
  { id: 5, titulo: 'axe 5', artista: 1, duracao: '3:45' },
  { id: 6, titulo: 'samba 6', artista: 2, duracao: '3:45' },
  { id: 7, titulo: 'pagode 7', artista: 1, duracao: '3:45' },
  { id: 8, titulo: 'funk 8', artista: 2, duracao: '3:45' },
  { id: 9, titulo: 'eletro 9', artista: 2, duracao: '3:45' },
  { id: 10, titulo: 'Música 10', artista: 1, duracao: '3:45' },
  { id: 11, titulo: 'Música 11', artista: 2, duracao: '3:45' },
]

const playlists = [
  { id: 1, nome: 'Playlist 1', musicas: [1, 2] },
  { id: 2, nome: 'Playlist 0', musicas: [1, 2] },
]

const artistas = [
  { id: 1, nome: 'Gustavo' },
  { id: 2, nome: 'Jorge e Matheus' },
  { id: 3, nome: 'Amado' },
]

export default { usuarios, musicas, playlists, artistas }
