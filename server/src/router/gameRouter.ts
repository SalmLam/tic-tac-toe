import express from 'express';

import { getOwnedGames, getAllGames, removeGame, createGame, updateGame, getGame} from '../controllers/gameController';
import { isAuthenticated, isOwner, isPlayer } from '../middleware';

export default (router: express.Router) => {
  router.post('/api/games/new', isAuthenticated, createGame);
  router.get('/api/games/owned/', isAuthenticated, getOwnedGames);
  router.get('/api/games/all/', isAuthenticated, getAllGames);
  router.get('/api/games/view/:id', isAuthenticated, isPlayer, getGame);
  router.delete('/api/games/remove/:id', isAuthenticated, isOwner, removeGame);
  router.post('/api/games/update/:id', isAuthenticated, isPlayer, updateGame);
};