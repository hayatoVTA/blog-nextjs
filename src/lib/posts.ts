import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import toc from 'remark-toc';

type MatterData = {
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
};

const postsDirectory = path.join(process.cwd(), 'posts');

export const getTags = (): any => {
  const allPosts = getSortedPostsData();
  let tags: string[] = [];
  allPosts.forEach((data: { tags: string }) => {
    tags = [...tags, ...data.tags];
  });
  // Set オブジェクトは、プリミティブ値やオブジェクト参照を問わず、あらゆる型で一意の値を格納できます。
  const setTags = [...new Set(tags)];
  return setTags.sort();
};

export const getAllPostByTag = (tag: string): any => {
  const allPosts = getSortedPostsData();
  const ret = allPosts.filter((data: { tags: string[] }) =>
    data.tags.includes(tag)
  );
  return ret;
};

export const getSortedPostsData = (): any => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug
    return {
      slug,
      ...(matterResult.data as MatterData),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getAllMdFile = (): string[] => {
  return fs.readdirSync(postsDirectory);
};

export const getPostData = async (slug: string): Promise<any> => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(toc, { heading: '目次', maxDepth: 2 })
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
};
