import express from 'express'
import musicaController from '../controllers/musicaController'

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
routes.post('/musicas', musicaController.addMusic)
routes.get('/musicas', musicaController.getAll)
routes.get('/musicas/:id', musicaController.getMusic)
routes.put('/musicas/:id', musicaController.putMusic)
routes.delete('/musicas/:id', musicaController.deleteMusic)

export default { routes }
