import express from 'express'
import musicaController from '../controllers/musicaController'
import artistaController from '../controllers/artistasController'
import playlistController from '../controllers/playlistsController'
import acessoController from '../controllers/acessoController'
import token from '../Util/Token'

const routes = express.Router()
/*components*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Musica:
 *       type: object
 *       required:
 *         - titulo
 *         - artista
 *         - duracao
 *       properties:
 *         id:
 *           type: integer
 *           description: Id da música
 *         titulo:
 *           type: string
 *           description: Título da música
 *         artista:
 *           type: integer
 *           description: ID do artista
 *         duracao:
 *           type: string
 *           description: Duração da música (formato HH:MM)
 *     Playlist:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Id da playlist
 *         nome:
 *           type: string
 *           description: Nome da playlist
 *         musicas:
 *           type: array
 *           items:
 *             type: integer
 *           description: Lista de IDs das músicas na playlist
 *       required:
 *         - nome
 *     Artista:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Id do artista
 *         nome:
 *           type: string
 *           description: Nome do artista
 *       required:
 *         - nome
 *     Usuario:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Id do usuário
 *         login:
 *           type: string
 *           description: Nome de usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *     Token:
 *       type: string
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do artista
 *   securitySchemes:
 *     beareAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/*Token*/

/**
 * @swagger
 * /autenticar:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT.
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Token JWT gerado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       401:
 *         description: Credenciais inválidas.
 */
routes.post('/autenticar', acessoController.login)

/**
 * @swagger
 * /musicas:
 *   post:
 *     summary: Adiciona uma nova música
 *     tags: [Músicas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Musica'
 *     responses:
 *       201:
 *         description: Música criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Musica'
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *         examples:
 *           exemploToken:
 *             value: "Bearer SEU_TOKEN_JWT_AQUI"
 */

/**
 * @swagger
 * /musicas:
 *   get:
 *     summary: Obtém todas as músicas
 *     tags: [Músicas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de músicas obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Musica'
 */

/**
 * @swagger
 * /musicas/{id}:
 *   get:
 *     summary: Obtém detalhes de uma música pelo ID
 *     tags: [Músicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música a ser obtida
 *     responses:
 *       200:
 *         description: Detalhes da música obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Musica'
 *       404:
 *         description: Música não encontrada
 */

/**
 * @swagger
 * /musicasPaginada:
 *   get:
 *     summary: Obtém músicas com paginação
 *     tags: [Músicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pagina
 *         in: query
 *         description: Número da página desejada
 *         required: false
 *         type: integer
 *       - name: itensPorPagina
 *         in: query
 *         description: Número de itens por página
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: Músicas obtidas com sucesso (com paginação)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Musica'
 */

/**
 * @swagger
 * /musicasPorFiltro:
 *   get:
 *     summary: Obtém músicas com filtros
 *     tags: [Músicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: artista
 *         in: query
 *         description: ID do artista para filtrar
 *         required: false
 *         type: integer
 *       - name: duracao
 *         in: query
 *         description: Duração da música para filtrar
 *         required: false
 *         type: string
 *       - name: titulo
 *         in: query
 *         description: Título da música para filtrar
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Músicas obtidas com sucesso (com filtros)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Musica'
 */

/**
 * @swagger
 * /musicasOrdernadas:
 *   get:
 *     summary: Obtém músicas ordenadas por título
 *     tags: [Músicas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Músicas obtidas com sucesso (ordenadas)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Musica'
 */

/**
 * @swagger
 * /musicas/{id}:
 *   put:
 *     summary: Atualiza uma música pelo ID
 *     tags: [Músicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música a ser atualizada
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Musica'
 *     responses:
 *       200:
 *         description: Música atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Musica'
 *       404:
 *         description: Música não encontrada
 */

/**
 * @swagger
 * /musicas/{id}:
 *   delete:
 *     summary: Deleta uma música pelo ID
 *     tags: [Músicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música a ser deletada
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticação
 *     responses:
 *       200:
 *         description: Música deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Musica'
 *       404:
 *         description: Música não encontrada

 */
routes.post('/musicas', token.autenticarMiddleware, musicaController.addMusica)
routes.get('/musicas', token.autenticarMiddleware, musicaController.getAll)
routes.get('/musicas/:id', token.autenticarMiddleware, musicaController.getMusica)
routes.get('/musicasPaginada', token.autenticarMiddleware, musicaController.obterMusicasPaginadas)
routes.get('/musicasPorFiltro', token.autenticarMiddleware, musicaController.obterMusicasFiltradas)
routes.get('/musicasOrdernadas', token.autenticarMiddleware, musicaController.ordenarMusicasPorTitulo)
routes.put('/musicas/:id', token.autenticarMiddleware, musicaController.putMusica)
routes.delete('/musicas/:id', token.autenticarMiddleware, musicaController.deleteMusica)

/*Artistas*/

/**
 * @swagger
 * /artistas:
 *   get:
 *     summary: Obtém todos os artistas
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de artistas obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artista'
 */

/**
 * @swagger
 * /artistas/{id}:
 *   get:
 *     summary: Obtém detalhes de um artista pelo ID
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do artista a ser obtido
 *     responses:
 *       200:
 *         description: Detalhes do artista obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artista'
 *       404:
 *         description: Artista não encontrado
 */

/**
 * @swagger
 * /artistas:
 *   post:
 *     summary: Adiciona um novo artista
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artista'
 *     responses:
 *       201:
 *         description: Artista criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artista'
 */

/**
 * @swagger
 * /artistasPaginada:
 *   get:
 *     summary: Obtém artistas com paginação
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pagina
 *         in: query
 *         description: Número da página desejada
 *         required: false
 *         type: integer
 *       - name: itensPorPagina
 *         in: query
 *         description: Número de itens por página
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: Artistas obtidos com sucesso (com paginação)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artista'
 */

/**
 * @swagger
 * /obterArtistasFiltrados:
 *   get:
 *     summary: Obtém artistas com filtros
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: nome
 *         in: query
 *         description: Nome do artista para filtrar
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Artistas obtidos com sucesso (com filtros)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artista'
 */

/**
 * @swagger
 * /ordenarArtistasPorNome:
 *   get:
 *     summary: Obtém artistas ordenados por nome
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Artistas obtidos com sucesso (ordenados)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artista'
 */

/**
 * @swagger
 * /artistas/{id}:
 *   put:
 *     summary: Atualiza um artista pelo ID
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do artista a ser atualizado
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artista'
 *     responses:
 *       200:
 *         description: Artista atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artista'
 *       404:
 *         description: Artista não encontrado
 */

/**
 * @swagger
 * /artistas/{id}:
 *   delete:
 *     summary: Deleta um artista pelo ID
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do artista a ser deletado
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticação
 *     responses:
 *       200:
 *         description: Artista deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artista'
 *       404:
 *         description: Artista não encontrado
 */

routes.post('/artistas', token.autenticarMiddleware, artistaController.addArtista)
routes.get('/artistas', token.autenticarMiddleware, artistaController.getAll)
routes.get('/artistas/:id', token.autenticarMiddleware, artistaController.getArtista)
routes.get('/artistasPaginada', token.autenticarMiddleware, artistaController.obterArtistasPaginadas)
routes.get('/artistasPorFiltro', token.autenticarMiddleware, artistaController.obterArtistasFiltrados)
routes.get('/artistasOrdernados', token.autenticarMiddleware, artistaController.ordenarArtistasPorNome)
routes.put('/artistas/:id', token.autenticarMiddleware, artistaController.putArtista)
routes.delete('/artistas/:id', token.autenticarMiddleware, artistaController.deleteArtista)

/*Playlist*/

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Obtém todas as playlists
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de playlists obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     summary: Obtém detalhes de uma playlist pelo ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da playlist a ser obtida
 *     responses:
 *       200:
 *         description: Detalhes da playlist obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist não encontrada
 */

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Adiciona uma nova playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Playlist'
 *     responses:
 *       201:
 *         description: Playlist criada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Playlist criada com sucesso
 *               playlist:
 *                 id: 3
 *                 nome: Playlist 3
 *                 musicas: [7, 8, 9]
 */

/**
 * @swagger
 * /playlistsPaginada:
 *   get:
 *     summary: Obtém playlists com paginação
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pagina
 *         in: query
 *         description: Número da página desejada
 *         required: false
 *         type: integer
 *       - name: itensPorPagina
 *         in: query
 *         description: Número de itens por página
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: Playlists obtidas com sucesso (com paginação)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */

/**
 * @swagger
 * /playlistsPorFiltro:
 *   get:
 *     summary: Obtém playlists com filtros
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: nome
 *         in: query
 *         description: Nome da playlist para filtrar
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Playlists obtidas com sucesso (com filtros)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */

/**
 * @swagger
 * /playlistsOrdernadas:
 *   get:
 *     summary: Obtém playlists ordenadas por nome
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Playlists obtidas com sucesso (ordenadas)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */

/**
 * @swagger
 * /playlists/{id}/AdicionarMusica:
 *   post:
 *     summary: Adiciona músicas a uma playlist
 *     tags: [Playlists - Músicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da playlist
 *         required: true
 *         type: integer
 *     requestBody:
 *       description: Lista de músicas a serem adicionadas
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               musicas:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Músicas inseridas na playlist com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist não encontrada ou músicas não existentes ou já presentes na playlist
 */

/**
 * @swagger
 * /playlists/{id}/RemoverMusica/{musica}:
 *   delete:
 *     summary: Remove uma música de uma playlist
 *     tags: [Playlists - Músicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da playlist
 *         required: true
 *         type: integer
 *       - name: musica
 *         in: path
 *         description: ID da música a ser removida
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Música removida da playlist com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist não encontrada ou música não encontrada na playlist
 */

/**
 * @swagger
 * /playlists/{id}:
 *   put:
 *     summary: Atualiza uma playlist pelo ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da playlist a ser atualizada
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Playlist'
 *     responses:
 *       200:
 *         description: Playlist atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist não encontrada
 */

/**
 * @swagger
 * /playlists/{id}:
 *   delete:
 *     summary: Deleta uma playlist pelo ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da playlist a ser deletada
 *     responses:
 *       200:
 *         description: Playlist deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist não encontrada
 */

routes.post('/playlists', token.autenticarMiddleware, playlistController.addPlaylist)
routes.post('/playlists/:id/AdicionarMusica', token.autenticarMiddleware, playlistController.addMusica)
routes.get('/playlists', token.autenticarMiddleware, playlistController.getAll)
routes.get('/playlists/:id', token.autenticarMiddleware, playlistController.getPlaylist)
routes.get('/playlistsPaginada', token.autenticarMiddleware, playlistController.obterPlaylistsPaginadas)
routes.get('/playlistsPorFiltro', token.autenticarMiddleware, playlistController.obterPlaylistsFiltrados)
routes.get('/playlistsOrdernadas', token.autenticarMiddleware, playlistController.ordenarPlaylistPorNome)
routes.put('/playlists/:id', token.autenticarMiddleware, playlistController.putPlaylist)
routes.delete('/playlists/:id', token.autenticarMiddleware, playlistController.deletePlaylist)
routes.delete('/playlists/:id/RemoverMusica/:musica', token.autenticarMiddleware, playlistController.deleteMusica)

/*Login*/

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um novo usuário.
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 */

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Atualiza um usuário existente.
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado.
 */

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Remove um usuário existente.
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado.
 */

routes.post('/usuario', acessoController.addUsuario)
routes.put('/usuario/:id', acessoController.putUsuario)
routes.delete('/usuario/:id', acessoController.deleteUsuario)

export default { routes }
