import Head from "next/head";
import Link from "next/link";
import { getAllTags } from "../src/post-api/api";
import { TagIcon } from "@heroicons/react/outline";
import Nav from "../src/components/Nav/Nav";
import Footer from "../src/components/Footer/Footer";
import { MountedContext, useMountedContext } from "../src/MountedContext";
import { useEffect } from "react";

export default function Tags({
  tags_count,
}: {
  tags_count: {
    name: string;
    count: number;
  }[];
}) {
  const { mounted, setMounted } = useMountedContext();
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Head>
        <title>Tags</title>
      </Head>

      <Nav mounted={mounted} />

      <div>
        <h1 className="text-5xl font-semibold text-center pt-8 pb-8 mt-8 mb-8">
          <div>
            <TagIcon className="w-8 h-8 inline-block mr-2" />
            <p className="inline-block">Tags</p>
            <TagIcon className="w-8 h-8 inline-block ml-2" />
          </div>
        </h1>
      </div>
      <div
        style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
        className="justify-center"
      >
        {tags_count.map(({ name, count }) => {
          return (
            <div key={name} className="mt-2 mb-2 mr-5 inline-block">
                <Link href={`tags/${name}`}>
                  <div className="cursor-pointer">
                    <span className="font-semibold pr-1 text-blue-500 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400">{name.toUpperCase()}</span>
                    <span>(</span>
                    <span>{count}</span>
                    <span>)</span>
                  </div>
                </Link>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

interface Tag {
  name: string;
  count: number;
}

export const getStaticProps = async () => {
  const tags = getAllTags();
  const keys = Array.from(tags.keys());
  const tags_count: Tag[] = [];
  keys.map((key) => {
    tags_count.push({ name: key, count: tags.get(key) as number });
  });
  return {
    props: {
      tags_count,
    },
  };
};
