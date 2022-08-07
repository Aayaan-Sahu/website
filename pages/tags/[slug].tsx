import fs from "fs";
import path from "path";
import Head from "next/head";
import type { GetStaticProps, GetStaticPaths } from "next";
import { getAllPosts, PostMetadata } from "../../src/post-api/api";
import Article from "../../src/components/Article/Article";
import Nav from "../../src/components/Nav/Nav";
import { MountedContext, useMountedContext } from "../../src/MountedContext";
import { useEffect } from "react";

export default function TagPage({
  slug,
  metadata_posts,
  description,
}: {
  slug: string;
  metadata_posts: PostMetadata[];
  description: string;
}) {
  const { mounted, setMounted } = useMountedContext();
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Nav mounted={mounted} />
      <Head>
        <title>{`Tag: ${slug}`}</title>
      </Head>
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <div className="pt-8 pb-8 mt-8 mb-8 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-center font-bold text-5xl pt-1">Tag: {slug}</h1>
          {description == "" ? null : (
            <p className="text-center text-gray-500 dark:text-gray-400 pt-4">{description}</p>
          )}
        </div>
        <Article metadata_posts={metadata_posts} />
      </div>
    </>
  );
}

const PROCESS = process.cwd();
const TAG_DESCRIPTION_PATH = path.join(PROCESS, "public", "tags", "descriptions")

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const posts = getAllPosts().filter((post) =>
    post.post_metadata.tags.includes(slug)
  );
  const slugLower = slug.toLowerCase();

  let description = "";
  if (fs.existsSync(path.join(TAG_DESCRIPTION_PATH, `${slugLower}.txt`))) {
    description = fs.readFileSync(
      path.join(TAG_DESCRIPTION_PATH, `${slugLower}.txt`),
      "utf-8"
    );
  }

  return {
    props: {
      slug,
      metadata_posts: posts.map((post) => post.post_metadata),
      description,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const tags = new Set(posts.map((post) => post.post_metadata.tags).flat());
  const paths = Array.from(tags).map((tag) => ({ params: { slug: tag } }));
  return {
    paths,
    fallback: false,
  };
};
