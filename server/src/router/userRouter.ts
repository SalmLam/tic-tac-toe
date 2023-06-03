import express from 'express';

import { getAllUsers } from '../controllers/userController';
import { isAuthenticated } from '../middleware';

export default (router: express.Router) => {
  router.get('/api/users', isAuthenticated, getAllUsers);
};