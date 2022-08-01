import Link from "next/link";
import type { PostMetadata } from "../../post-api/api";
import { convertDateToString } from "../../date-api/api";
import styles from "./Article.module.css";

export default function Article({
  metadata_posts,
}: {
  metadata_posts: PostMetadata[];
}): JSX.Element {
  return (
    <div className="ml-8 mt-8">
      {/* <ul className={styles.article}> */}
      <ul>
        {metadata_posts.map((post) => (
          <li key={post.slug} className="pt-4 pb-4">
            <span>
              <p className={styles.inline_span}>
                {convertDateToString(post.date)}
              </p>
              <p className={styles.inline_span}>&nbsp;&nbsp;•&nbsp;&nbsp;</p>
              <p className={styles.inline_span}>{post.reading_time}</p>
            </span>
            <br />
            <Link href={`/posts/${post.slug}`}>
              <a className={`text-xl font-semibold`}>{post.title}</a>
            </Link>
            <br />
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <a
                  className={`mr-2 font-medium uppercase text-blue-500 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 ${styles.tag}`}
                >
                  {tag}
                </a>
              </Link>
            ))}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.description}
            </p>
            <Link href={`/posts/${post.slug}`}>
              {/* <p style={{ cursor: "pointer" }}>Read more →</p> */}
              <p
                style={{ cursor: "pointer" }}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400"
              >
                Read more →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
