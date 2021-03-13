import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

type MatterData = {
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
};

const postsDirectory = path.join(process.cwd(), 'posts');

export const getTags = (): any => {
  const allPosts = getSortedPostsData();
  let tags: any[] = [];
  allPosts.forEach((data: { tags: any }) => {
    tags = [...tags, ...data.tags];
  });
  // Set オブジェクトは、プリミティブ値やオブジェクト参照を問わず、あらゆる型で一意の値を格納できます。
  const setTags = [...new Set(tags)];
  return setTags.sort();
};

export const getAssociatedPosts = async (tag: string): Promise<any> => {
  const allPosts = getSortedPostsData();
  const associatedPosts = allPosts.filter((data: { tags: string | string[] }) =>
    data.tags.includes(tag)
  );
  return associatedPosts;
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

export const getAllPostBySlug = (): any => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
};

export const getPostData = async (slug: string): Promise<any> => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
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
