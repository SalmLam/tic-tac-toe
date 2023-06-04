import express from 'express';

import { getUsers, getUserById} from '../models/user';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {

        const user = await getUsers();
        
        if (!user) 
            return res.status(404).json("Users were not found").end();

        return res.status(200).json(user);
    }catch(error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const users = await getUserById(userId);
        
        if (!users) 
            return res.status(404).json("Users were not found").end();

        return res.status(200).json(users);
    }catch(error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}

