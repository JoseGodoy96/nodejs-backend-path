import express from 'express';
import { getAllPosts, insertPost, updatePost, deletePost } from '../db/mongo.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
	const posts = await getAllPosts();
	res.json(posts);
});

router.post('/', async (req, res) => {
	const id = await insertPost(req.body);
	res.status(201).json({ _id: id });
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const result = await updatePost(id, req.body);
	res.json(result);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const result = await deletePost(id);
	res.json(result);
});

export default router;
