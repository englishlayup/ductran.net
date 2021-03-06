import { Client, Entity, Schema } from 'redis-om';

const client = new Client();

async function connect() {
	if (!client.isOpen()) {
		await client.open(process.env.REDIS_URL);
	}
}

interface Post {
	title: string;
	date: Date;
	description: string;
	content: string;
	filename: string;
}

class Post extends Entity {}

const schema = new Schema(
	Post,
	{
		title: { type: 'text' },
		date: { type: 'date', sortable: true },
		description: { type: 'text' },
		content: { type: 'string' },
		filename: { type: 'string' },
	},
	{
		dataStructure: 'JSON',
	}
);

export async function getAllPosts() {
	await connect();
	const repository = client.fetchRepository(schema);
	const posts = await repository.search().sortDescending('date').return.all();
	return posts;
}

export async function createIndex() {
	await connect();

	const repository = client.fetchRepository(schema);
	await repository.createIndex();
}

export async function searchPosts(q: string) {
	await connect();

	const repository = client.fetchRepository(schema);

	const posts = await repository
		.search()
		.where('title')
		.matches(q)
		.or('description')
		.matches(q)
		.sortDescending('date')
		.return.all();

	return posts;
}

export async function getPostByPath(q: string) {
	await connect();

	const repository = client.fetchRepository(schema);

	const post = await repository.search().where('filename').eq(q).return.all();

	return post[0];
}

export async function getPost(id: string) {
	await connect();
	const repository = client.fetchRepository(schema);
	const result = await repository.fetch(id);

	return result;
}
