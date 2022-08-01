import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import {
  getPostFromSlug,
  getSlugs,
  PostMetadata,
} from "../../src/post-api/api";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import "highlight.js/styles/atom-one-dark.css";
import Nav from "../../src/components/Nav/Nav";
import { MountedContext, useMountedContext } from "../../src/MountedContext";
import { useEffect } from "react";
import Youtube from "../../src/components/Youtube/Youtube";

interface MDXPost {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  post_metadata: PostMetadata;
}

export default function PostPage({ post }: { post: MDXPost }) {
  const { mounted, setMounted } = useMountedContext();
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Nav mounted={mounted} />
      <Head>
        <title>{post.post_metadata.title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css"
          integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <div className="pt-8 pb-8 mt-8 mb-8 border-b border-gray-300 dark:border-gray-700">
          <h1 className="font-bold text-5xl text-center pb-1">
            {post.post_metadata.title}
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400">
            {post.post_metadata.date}
          </p>
          <div className="items-center flex flex-row justify-center">
            {post.post_metadata.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <a
                  style={{ fontSize: "0.85rem" }}
                  className={`mr-2 font-medium uppercase text-blue-500 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400`}
                >
                  {tag}
                </a>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-center">By Aayaan Sahu</p>
        </div>
        <MDXRemote {...post.source} components={{ Youtube }} />
        <div className="py-4"></div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { post_content, post_metadata } = getPostFromSlug(slug);
  const mdxSource = await serialize(post_content, {
    mdxOptions: {
      remarkPlugins: [
        [remarkParse, { commonmark: true, fragment: true }],
        remarkMath,
        remarkStringify,
        remarkGfm,
        remarkFootnotes,
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight,
      ],
    },
  });
  return {
    props: {
      post: {
        source: mdxSource,
        post_metadata,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};
