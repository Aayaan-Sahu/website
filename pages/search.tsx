import Link from "next/link";
import Nav from "../src/components/Nav/Nav";
import { useEffect, useState, useRef } from "react";
import {
  getTextFromSlug,
  getSlugs,
  getAllPosts,
  PostMetadata,
} from "../src/post-api/api";
import { MountedContext, useMountedContext } from "../src/MountedContext";
import Article from "../src/components/Article/Article";
import Footer from "../src/components/Footer/Footer";

interface PostData {
  slug: string;
  title: string;
  content: string;
  description: string;
}

export default function Search({
  sources,
  metadata_posts,
}: {
  sources: PostData[];
  metadata_posts: PostMetadata[];
}) {
  const { mounted, setMounted } = useMountedContext();
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line
  }, []);

  const [search, setSearch] = useState("");

  const [searchSelected, setSearchSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // focus the input field when the page loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // focus the input field when the enter key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  const render = () => {
    let slugs: string[] = [];
    sources.map((source) => {
      const titleAsLowercase = source.title.toLowerCase();
      if (
        titleAsLowercase.includes(search) ||
        source.description.includes(search) ||
        source.content.includes(search)
      ) {
        slugs.push(source.slug);
      }
    });
    metadata_posts = metadata_posts.filter((post) => slugs.includes(post.slug));
    return <Article metadata_posts={metadata_posts} />;
  };

  return (
    <>
      <Nav mounted={mounted} />
      <div
        style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
        className="flex flex-col justify-center text-center"
      >
        <h1 className="text-5xl font-semibold text-center pt-8 mt-8">Search</h1>
        <p className="pb-8 mb-8 text-gray-500 dark:text-gray-400">
          Scours post <strong>titles</strong>, <strong>content</strong>, and {" "}
          <strong>description</strong>.
        </p>
        <input
          style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
          className="bg-gray-200 dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
          type="text"
          name="name"
          ref={inputRef}
          placeholder="Press Enter to Search"
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
        <div>
          {search === "" && <Article metadata_posts={metadata_posts} />}
          {search !== "" && render()}
        </div>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  let sources: PostData[] = [];
  const slugs = getSlugs();
  slugs.map((slug) => {
    const { title, content, description } = getTextFromSlug(slug);
    sources.push({ slug, title, content, description });
  });
  const metadata_posts = getAllPosts().map((post) => post.post_metadata);

  return {
    props: {
      sources,
      metadata_posts,
    },
  };
};
