import express from 'express';
import {get, merge} from 'lodash';

import { getUserBySessionToken } from '../models/user';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['TICTACTOE-AUTH'];

        if (!sessionToken) {
            return res.status(403).json("Unauthorized");
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.status(403).json("Unauthorized");
        }
      
        merge(req, { identity: existingUser });
      
        return next();


    }catch (error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}