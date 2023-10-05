import { Router, Request, Response } from 'express';
import myCache from '../services/cache';
import { io } from '../server';

const routes = Router();

routes.post('/users', (req: Request, res: Response) => {
    const userData = req.body;

    const users: any[] = myCache.get('users') || [];

    const userExists = users.find(user => user.username === userData.username);

    if (!userExists) {
        users.push(userData);
        io.emit("sendNewContactToClient", userData);
    }

    myCache.set('users', users);

    res.status(200).send("Adicionado com sucesso");
})

routes.get('/users', (req: Request, res: Response) => {
    const users: any[] = myCache.get('users') || [];
    res.status(200).json(users);
})



export default routes;
