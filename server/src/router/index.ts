import express from 'express';

import authentication from './authentication';
import userRouter from './userRouter';
import gameRouter from './gameRouter';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  userRouter(router);
  gameRouter(router);
  return router;
};