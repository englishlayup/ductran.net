import { Client, Entity, Schema } from 'redis-om';

const client = new Client()

async function connect() {
    if(!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

interface Post {
    title: string;
    date: Date;
    description: string;
    content: string;
}

class Post extends Entity {}

const schema = new Schema(
    Post,
    {
        title: {type: 'string'},
        date: {type: 'date', sortable: true},
        description: {type: 'string'},
        content: {type: 'string'}, 
    },
    {
        dataStructure:'JSON',
    }
)

export async function getAllPosts() {
    await connect();
    const repository = client.fetchRepository(schema)
    const posts = await repository.search().sortDescending('date').return.all()
    return posts;
}

export async function createIndex() {
    await connect();
    
    const repository = client.fetchRepository(schema);
    await repository.createIndex();
}

export async function searchPosts(q:string) {
    await connect();

    const repository = client.fetchRepository(schema);
    const posts = await repository.search()
            .where('title').matches(q)
            .or('description').matches(q)
            .sortDescending('date')
            .return.all()
    return posts
}


export async function getPost(id:string) {
    await connect();
    const repository = client.fetchRepository(schema);
    const result = await repository.fetch(id);

    return result
}