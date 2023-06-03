import express from 'express';

import { getOwnedGames, getAllGames, removeGame, createGame} from '../controllers/gameController';
import { isAuthenticated, isOwner } from '../middleware';

export default (router: express.Router) => {
  router.post('/api/games/new', isAuthenticated, createGame);
  router.get('/api/games/owned/', isAuthenticated, getOwnedGames);
  router.get('/api/games/all/', isAuthenticated, getAllGames);
  router.delete('/api/games/remove/:id', isAuthenticated, isOwner, removeGame)
};