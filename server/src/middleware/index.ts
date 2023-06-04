import express from 'express';
import {get, merge} from 'lodash';

import { getUserBySessionToken } from '../models/user';
import { getGameById } from '../models/game';

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

/** the owner of a game is by defaul the first player */
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const id = req.params.id;
        const game = await getGameById(id);

        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            res.status(403).json(`unauthorized`);
        }
        if (currentUserId.toString() !== game.firstPlayer._id.toString()) {
            res.status(403).json(`unauthorized`);
        }

        return next();

    }catch (error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}


export const isPlayer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const id = req.params.id;
        const game = await getGameById(id);

        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            res.status(403).json(`unauthorized`);
        }
        if (currentUserId.toString() !== game.firstPlayer._id.toString() && currentUserId.toString() !== game.secondPlayer._id.toString()) {
            res.status(403).json(`unauthorized`);
        }

        return next();

    }catch (error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}