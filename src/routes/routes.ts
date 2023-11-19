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
