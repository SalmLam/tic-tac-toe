import express from 'express';

import { getUsers } from '../models/user';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {

        const users = await getUsers();
        
        if (!users) 
            return res.status(404).json("Users were not found").end();

        return res.status(200).json(users);
    }catch(error) {
        res.status(500).json(`an error occured  : ${error}`);
    }
}

