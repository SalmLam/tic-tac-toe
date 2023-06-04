import express from 'express';

import { getAllUsers, getUser} from '../controllers/userController';
import { isAuthenticated } from '../middleware';

export default (router: express.Router) => {
  router.get('/api/users', isAuthenticated, getAllUsers);
  router.get('/api/user/:id', isAuthenticated, getUser);
};