import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostPaths, getPostData } from "../../lib/posts";
import { getPostByPath } from "../../lib/redis";
import utilStyles from "../../styles/utils.module.css";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostPaths();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostByPath(params.id as string);
  const postData = await getPostData(post.entityId);
  return {
    props: {
      postData,
    },
  };
};
