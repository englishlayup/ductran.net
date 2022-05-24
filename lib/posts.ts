import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { getAllPosts, getPostByPath } from './redis';

export async function getSortedPostsData() {
	const posts = await getAllPosts();

	const allPostsData = posts.map((post) => {
		const id = post.filename;
		const date = new Date(post.date.toString()).toISOString();
		const title = post.title;

		return { id, date, title };
	});

	return allPostsData;
}

export async function getAllPostIds() {
	const posts = await getAllPosts();

	return posts.map((post) => {
		return {
			params: {
				id: post.entityId,
			},
		};
	});
}

export async function getAllPostPaths() {
	const posts = await getAllPosts();

	return posts.map((post) => {
		return {
			params: {
				pid: post.filename,
			},
		};
	});
}

export async function getPostData(path: string) {
	const post = await getPostByPath(path);

	const processedContent = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeExternalLinks, { target: '_blank', rel: ['noreferrer'] })
		.use(rehypeStringify)
		.process(post.content);

	const contentHtml = processedContent.toString();
	const date = new Date(post.date.toString()).toISOString();
	const title = post.title;
	const id = post.entityId;

	return {
		id: id,
		contentHtml,
		date,
		title,
	};
}
