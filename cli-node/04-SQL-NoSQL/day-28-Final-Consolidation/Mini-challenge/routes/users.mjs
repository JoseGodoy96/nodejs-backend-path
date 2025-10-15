import express from 'express';
import Joi from 'joi';
import { getUsers, insertUser, updateUser, deleteUser } from '../db/postgres.mjs';

const router = express.Router();

const usersSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

router.get("/", async (req, res, next) => {
	try {
		const allUsers = await getUsers();
		res.json(allUsers);
	} catch (err) {
		next(err);
	}
})

router.post("/", async (req, res, next) => {
	try {
		const { error, value } = usersSchema.validate(req.body);
		if (error) {
			return res.json(400).json({ error: error.details[0].message })
		}
		const user = await insertUser(value.username, value.email, value.password);
		res.status(201).json(user);
	} catch (err) {
		next(err);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const { error, value } = usersSchema.validate(req.body);
		if (error) {
			return res.json(400).json({ error: error.details[0].message })
		}
		const user = await updateUser(id, value.username, value.email, value.password);
		res.json(user);
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const del = await deleteUser(id);
		res.json(del);
	} catch (err) {
		next(err);
	}
});

export default router;