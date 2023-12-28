/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://glssry.org",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  exclude: [
    "/api/*",
    "/account/*",
    "/post/edit",
    "/post/list",
    "/post/pending",
  ],
};
