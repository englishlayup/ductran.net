import { remark } from 'remark'
import html from 'remark-html'

import { getAllPosts, getPost } from './redis'

export async function getSortedPostsData() {

  const posts = await getAllPosts();
  
  const allPostsData = posts.map(post =>{
    const id = post.entityId;
    const date = new Date(post.date.toString()).toISOString();
    const title = post.title;
    
    return { id, date, title }
  })

  return allPostsData;
}

export async function getAllPostIds() {

  const posts = await getAllPosts();

  return posts.map(post => {
    return {
      params: {
        id: post.entityId,
      }
    }
  })

}

export async function getPostData(id: string) {

  const post = await getPost(id);

  const processedContent = await remark()
    .use(html)
    .process(post.content);
  
  const contentHtml = processedContent.toString();
  const date = new Date(post.date.toString()).toISOString();
  const title = post.title;

  return {
    id,
    contentHtml,
    date,
    title,
  }
}
