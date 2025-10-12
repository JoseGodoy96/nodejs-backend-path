import express from 'express';
import { getAllUsers, insertUser, updateUser, deleteUser } from '../db/postgres.mjs';

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		res.json(users);
		const users = await getAllUsers();
	} catch (err) {
	next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { username, password } = req.body;	
	if (!username || !password) {
		return res.status(400).json({ error: 'username y password son requeridos' });
	}	
		const user = await insertUser(username, password);
		res.status(201).json(user);
	} catch (err) {
	next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { username, password } = req.body;	
		if (!username || !password) {
			return res.status(400).json({ error: 'username y password son requeridos' });
		}	
		const user = await updateUser(id, username, password);
		res.json(user);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await deleteUser(id);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

export default router;

