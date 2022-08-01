import fs from "fs";
import path from "path";
import { sync } from "glob";
import matter from "gray-matter";
import reading_time from "reading-time";

const POST_PATH = path.join(process.cwd(), "posts");

export const getSlugs = (): string[] => {
  const paths = sync(`${POST_PATH}/*.mdx`);
  return paths.map((path) => {
    const parts = path.split("/");
    const fileName = parts[parts.length - 1];
    return fileName.split(".")[0];
  });
};

export interface PostMetadata {
  slug: string;
  title: string;
  tags: string[];
  date: string;
  description: string;
  reading_time: string;
}

interface Post {
  post_content: string;
  post_metadata: PostMetadata;
}

interface PostSearchableContent {
  title: string;
  content: string;
  description: string;
}

export const getTextFromSlug = (slug: string): PostSearchableContent => {
  const postPath = path.join(POST_PATH, `${slug}.mdx`);
  const fileText = fs.readFileSync(postPath, "utf-8");
  let { content, data } = matter(fileText);
  content = content.toLowerCase();
  const postContentsWithoutLineBreaks = content.replace(/[\r\n]/g, " ");
  const title = data["title"] ?? "";
  const description = data["description"].toLowerCase() ?? "";
  return {
    title,
    content: postContentsWithoutLineBreaks,
    description,
  }
}

export const getPostFromSlug = (slug: string): Post => {
  const postPath = path.join(POST_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postPath);
  const { content, data } = matter(source);
  const post_read_time = reading_time(content)["text"];
  return {
    post_content: content,
    post_metadata: {
      slug: slug,
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: data.date,
      description: data.description ?? "",
      reading_time: post_read_time,
    },
  };
};

export const getAllTags = (): Map<string, number> => {
  const tags = getSlugs()
    .map((slug) => getPostFromSlug(slug).post_metadata.tags)
    .flat()
    .sort();

  const tagAndCount = new Map<string, number>();
  tags.forEach((tag) => {
    if (tagAndCount.has(tag)) {
      tagAndCount.set(tag, tagAndCount.get(tag)! + 1);
    } else {
      tagAndCount.set(tag, 1);
    }
  });
  return tagAndCount;
};

export const getAllPosts = (): Post[] => {
  const posts = getSlugs()
    .map((slug) => getPostFromSlug(slug))
    .sort((a, b) => {
      // sort by post date
      if (a.post_metadata.date > b.post_metadata.date) return 1;
      if (a.post_metadata.date < b.post_metadata.date) return -1;
      return 0;
    })
    .reverse();
  return posts;
};
