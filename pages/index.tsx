import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getAllPosts, PostMetadata, getAllTags } from "../src/post-api/api";
import Nav from "../src/components/Nav/Nav";
import Footer from "../src/components/Footer/Footer";
import Article from "../src/components/Article/Article";
import { useTheme } from "next-themes";
import { useState, useEffect, useContext } from "react";
import { MountedContext, useMountedContext } from "../src/MountedContext";

export default function Home({
  metadata_posts,
}: {
  metadata_posts: PostMetadata[];
}) {
  const { systemTheme, theme, setTheme } = useTheme();
  const { mounted, setMounted } = useMountedContext();

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav mounted={mounted} />

      <div
        className="dark:border-gray-700"
        style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="pt-3 pb-3 h-screen">
          <div className="border-l border-gray-300 dark:border-gray-700">
            <Article metadata_posts={metadata_posts} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const metadata_posts = getAllPosts()
    .slice(0, 9)
    .map((post) => post.post_metadata);
  return {
    props: { metadata_posts },
  };
};
