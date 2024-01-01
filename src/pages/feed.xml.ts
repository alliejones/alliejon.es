import type { APIContext } from "astro";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPostPathFromSlug } from "@content/posts/_utils";

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");

  return rss({
    title: "Blog | Allie Jones",
    description: "RSS feed for alliejon.es/blog",
    site: `${context.site}`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      content: sanitizeHtml(parser.render(post.body)),
      link: `/blog/${getPostPathFromSlug(post.slug)}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
