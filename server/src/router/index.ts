import express from 'express';

import authentication from './authentication';
import userRouter from './userRouter';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  userRouter(router);
  return router;
};