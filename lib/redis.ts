import { Client, Entity, Schema } from 'redis-om'

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
    tags: string;
}

class Post extends Entity {}

const schema = new Schema(
    Post,
    {
        title: {type: 'string'},
        date: {type: 'date'},
        description: {type: 'string'},
        content: {type: 'string'},
        tags: {type: 'string'},
    },
    {
        dataStructure:'JSON',
    }
)

export async function createPost(
    data: {
        title: string;
        date: Date;
        description: string;
        content: string;
        tags: string;
    }) {

    await connect()

    const repository = client.fetchRepository(schema)

    const post = repository.createEntity(data)

    const id = await repository.save(post)
    
    return id
}