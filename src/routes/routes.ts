import express from 'express'
import musicaController from '../controllers/musicaController'
import artistaController from '../controllers/artistasController'
import playlistController from '../controllers/playlistsController'
import acessoController from '../controllers/acessoController'
import token from '../Util/Token'

const routes = express.Router()

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
 *     securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /musicas:
 *   post:
 *     summary: Adiciona uma nova música
 *     tags: [Músicas]
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
 *             example:
 *               mensagem: Música criada com sucesso
 *               musica:
 *                 id: 3
 *                 titulo: Música 3
 *                 artista: 3
 *                 duracao: '5:15'
 */

/**
 * @swagger
 * /musicas:
 *   get:
 *     summary: Obtém todas as músicas
 *     tags: [Músicas]
 *     responses:
 *       200:
 *         description: Lista de músicas obtida com sucesso
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Lista de músicas obtida com sucesso
 *               musicas:
 *                 - id: 1
 *                   titulo: Música 1
 *                   artista: 1
 *                   duracao: '4:30'
 *                 - id: 2
 *                   titulo: Música 2
 *                   artista: 2
 *                   duracao: '3:45'
 */

/**
 * @swagger
 * /musicas/{id}:
 *   get:
 *     summary: Obtém detalhes de uma música pelo ID
 *     tags: [Músicas]
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
 *             example:
 *               mensagem: Detalhes da música obtidos com sucesso
 *               musica:
 *                 id: 1
 *                 titulo: Música 1
 *                 artista: Artista 1
 *                 genero: Rock
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Música não encontrada
 */

/**
 * @swagger
 * /musicas/{id}:
 *   put:
 *     summary: Atualiza uma música pelo ID
 *     tags: [Músicas]
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
 *             example:
 *               mensagem: Música atualizada com sucesso
 *               musica:
 *                 id: 1
 *                 titulo: Música Atualizada
 *                 artista: Artista Atualizado
 *                 genero: Rock Atualizado
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Música não encontrada
 */

/**
 * @swagger
 * /musicas/{id}:
 *   delete:
 *     summary: Deleta uma música pelo ID
 *     tags: [Músicas]
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
 *             example:
 *               mensagem: Música deletada com sucesso
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Música não encontrada
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

routes.post('/artistas', token.autenticarMiddleware, artistaController.addArtista)
routes.get('/artistas', token.autenticarMiddleware, artistaController.getAll)
routes.get('/artistas/:id', token.autenticarMiddleware, artistaController.getArtista)
routes.get('/artistasPaginada', token.autenticarMiddleware, artistaController.obterArtistasPaginadas)
routes.get('/artistasPorFiltro', token.autenticarMiddleware, artistaController.obterArtistasFiltrados)
routes.get('/artistasOrdernados', token.autenticarMiddleware, artistaController.ordenarArtistasPorNome)
routes.put('/artistas/:id', token.autenticarMiddleware, artistaController.putArtista)
routes.delete('/artistas/:id', token.autenticarMiddleware, artistaController.deleteArtista)

/*Playlist*/

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

routes.get('/login', acessoController.login)

export default { routes }
