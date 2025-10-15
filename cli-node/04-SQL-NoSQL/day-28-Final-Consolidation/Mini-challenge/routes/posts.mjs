import express from 'express';
import Joi from 'joi';
import { getAllPosts, insertPost, updatePost, deletePost } from '../db/mongo.mjs';

const router = express.Router();

const postSchema = Joi.object({
	title: Joi.string().min(3).required(),
	content: Joi.string().min(10).required(),
	author: Joi.string().required()
});

router.get('/', async (req, res) => {
	const posts = await getAllPosts();
	res.json(posts);
});

router.post('/', async (req, res) => {
	const { error, value } = postSchema.validate(req.body);
	if (error)
		return res.status(400).json({ error: error.details[0].message });
	const id = await insertPost(value);
	res.status(201).json({ _id: id });
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { error, value } = postSchema.validate(req.body);
	if (error)
		return res.status(400).json({ error: error.details[0].message });
	const result = await updatePost(id, value);
	res.json(result);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const result = await deletePost(id);
	res.json(result);
});

export default router;
