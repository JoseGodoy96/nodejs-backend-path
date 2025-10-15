import { MongoClient, ObjectId } from 'mongodb';

const username = encodeURIComponent("josemariagodoy1996_db_user");
const password = encodeURIComponent("micontraseña1234");
const uri = `mongodb+srv://${username}:${password}@cluster0.is9fdnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);
const dbName = 'example';
let db;

export async function connectMongo() {
	await client.connect();
	db = client.db(dbName);
	console.log("Conectado a MongoDB");
}

export function getPostsCollection() {
	return db.collection('posts');
}

export async function getAllPosts() {
	return await getPostsCollection().find().toArray();
}

export async function insertPost(post) {
	const res = await getPostsCollection().insertOne(post);
	return res.insertedId;
}

export async function updatePost(id, post) {
	await getPostsCollection().updateOne(
		{ _id: new ObjectId(id) },
		{ $set: post }
	);
	return { message: 'Post actualizado' };
}

export async function deletePost(id) {
	await getPostsCollection().deleteOne({ _id: new ObjectId(id) });
	return { message: 'Post eliminado' };
}
