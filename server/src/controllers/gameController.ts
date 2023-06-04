import express from 'express';

import { getGamesByPlayer, getGamesByOwner, deleteGameById, addGame, updateGameById, getGameById} from '../models/game';
import { getUserByEmail } from '../models/user';
import { checkEndOfGame } from '../services/gameService';
import {get, merge} from 'lodash';

export const getOwnedGames = async (req: express.Request, res: express.Response) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;
        console.log(`currentId : ${currentUserId}`);
        const games = await getGamesByOwner(currentUserId);
        
        if (!games) 
            return res.status(404).json("Games were not found").end();

        return res.status(200).json(games);
    }catch(error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}

export const getAllGames = async (req: express.Request, res: express.Response) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;

        const games = await getGamesByPlayer(currentUserId);
        
        if (!games) 
            return res.status(404).json("Games were not found").end();

        return res.status(200).json(games);
    }catch(error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}

export const removeGame = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        const deleted = await deleteGameById(id);
        
        if (!deleted) 
            return res.status(500).json("The game was not deleted");

        return res.status(200).json(deleted);
    }catch(error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}

export const createGame = async (req: express.Request, res: express.Response) => {
    try {
        let game : any = {};

        /** TO REVIEW */
        const {secondPlayerEmail} = req.body;
        game.secondPlayer = await getUserByEmail(secondPlayerEmail);
        /** TO REVIEW */

        const currentUser = get(req, 'identity');
        game.firstPlayer = currentUser;
        const created = await addGame(game);
        
        if (!created) 
            return res.status(500).json("The game was not created").end();

        return res.status(204).json(created);
    }catch(error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}

export const updateGame = async (req: express.Request, res: express.Response) => {
    try {
        const game = req.body;  
        const id = req.params.id;
        if (game.winner !== 0)
            return res.status(403).json("The game is over");
        game.winner = await checkEndOfGame(game.board);
        const updated = await updateGameById(id, game);
        
        if (!updated) 
            return res.status(500).json("The game was not updated");

        return res.status(200).json(game);
    }catch(error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}

export const getGame = async (req: express.Request, res: express.Response) => {
    try { 
        const id = req.params.id;
        const game = await getGameById(id);
        
        if (!game) 
            return res.status(404).json("The game was not found");

        return res.status(200).json(game);
    }catch(error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}