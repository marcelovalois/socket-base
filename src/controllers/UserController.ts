import { Request, Response, NextFunction } from "express";
import myCache from "../services/cache";
import { io } from '../server';

export default class UserController {
    async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: UserData = req.body;

            const users: UserData[] = myCache.get('users') || [];

            const userExists = users.find(user => user.id === userData.id);

            if (!userExists) {
                users.push(userData);
                io.emit("sendNewContactToClient", userData);
            }

            myCache.set('users', users);

            res.status(200).send("Adicionado com sucesso");
        } catch (error) {
            next(error);
        }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const users: UserData[] = myCache.get('users') || [];
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
}
