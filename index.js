const Parser = require("rss-parser");
const parser = new Parser();
const Mustache = require("mustache");
const fs = require("fs");

(async () => {
  let feed = await parser.parseURL("https://blog.kurtstories.com/index.xml");
  const arr = [];
  feed.items.forEach((item) => {
    arr.push({ title: item.title, link: item.link });
  });

  const len = Math.min(arr.length, 5);

  buildRecentPostsMd(arr.slice(0, len));
})();

function buildRecentPostsMd(posts) {
  const template = fs.readFileSync(`posts-template.html`).toString();
  const output = Mustache.render(template, { posts });
  fs.writeFileSync("./POSTS.html", output);
}
