export const config = {
  siteMeta: {
    title: 'BLOG',
    description: 'いろいろ試すだけのブログ（Next.js × Vercel）',
  },
  baseUrl:
    process.env.NODE_ENV === ('production' || 'development')
      ? process.env.NEXT_PUBLIC_BASEURL
      : 'http://localhost:3000',
  social: {
    twitter: 'https://twitter.com/',
    github: 'https://github.com/',
  },
};
