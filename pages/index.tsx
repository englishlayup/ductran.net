import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import SearchBox from '../components/SearchBox';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export const getStaticProps: GetStaticProps = async () => {
	const allPostsData = await getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
};

export default function Home({
	allPostsData,
}: {
	allPostsData: {
		date: string;
		title: string;
		id: string;
	}[];
}) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					Hi I&#39;m <strong>Duc</strong>. I like creative and programming work.
					You can check out my personal blog or contact me via{' '}
					<a href="mailto:tnhdd99@gmail.com">tnhdd99@gmail.com</a>.
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<SearchBox />
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
