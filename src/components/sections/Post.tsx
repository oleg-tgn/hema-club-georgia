import { getLocale, getTranslations } from "next-intl/server";
import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import { Link } from "@/i18n/navigation";
import { outlineOf } from "@/lib/posts";
import type { Post as PostDoc } from "@/payload-types";
import Heading from "../ui/Heading";
import PostContents, { sectionTimeline } from "../ui/PostContents";
import PostDateline from "../ui/PostDateline";
import PostContentsMenu from "../ui/PostContentsMenu";
import PostImage from "../ui/PostImage";
import Tailpiece from "../ui/Tailpiece";

type Content = PostDoc["content"];

// Subheadings get the ids from the outline, so the contents (and anyone
// sharing a link to a section) can point at them.
function convertersWith(ids: Map<object, string>): JSXConvertersFunction {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const Tag = node.tag;
      return (
        <Tag id={ids.get(node)}>{nodesToJSX({ nodes: node.children })}</Tag>
      );
    },
    upload: ({ node }) => <PostImage node={node} />,
  });
}

// The text cut before each outlined heading: the opening (before the first
// subheading, maybe empty), then one part per subheading.
function splitAt(content: Content, ids: Map<object, string>): Content[] {
  const parts: Content["root"]["children"][] = [[]];
  for (const node of content.root.children) {
    if (ids.has(node)) parts.push([]);
    parts[parts.length - 1].push(node);
  }
  return parts.map((children) => ({
    root: { ...content.root, children },
  }));
}

// Set like a book chapter in one narrow column: title, dateline, the lead
// a step larger than the text, the text, and a tailpiece to close it.
// A long post can also show its contents: in the margin left of the text
// on wide screens, staying in view while reading; on narrower ones, where
// there is no margin, behind a button in the header.
export default async function Post({ post }: { post: PostDoc }) {
  const locale = await getLocale();
  const t = await getTranslations("Blog");

  const outline = outlineOf(post);
  const converters = convertersWith(outline.ids);
  const showContents = post.showContents && outline.items.length >= 2;

  const heading = (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <Heading as="h1">{post.title}</Heading>
        <PostDateline post={post} locale={locale} />
      </header>
      {post.lead && (
        <p className="text-night font-text text-lead">{post.lead}</p>
      )}
    </>
  );

  // With contents the post is cut into back-to-back parts, each a
  // view-timeline for its contents link: the opening (title, lead and the
  // text before the first subheading), then one <section> per subheading.
  const [opening, ...sections] = showContents
    ? splitAt(post.content, outline.ids)
    : [];

  const article = (
    <article className="mx-auto flex w-full max-w-160 flex-col gap-8 xl:col-start-2 xl:row-start-1">
      {showContents ? (
        <div>
          <div
            className="post-part flex flex-col gap-8"
            style={{ viewTimelineName: sectionTimeline(0) }}
          >
            {heading}
            {opening.root.children.length > 0 && (
              <RichText
                data={opening}
                converters={converters}
                className="post-body"
              />
            )}
          </div>
          <div className="post-body">
            {sections.map((part, i) => (
              <section
                key={i}
                className="post-part"
                style={{ viewTimelineName: sectionTimeline(i + 1) }}
              >
                <RichText
                  data={part}
                  converters={converters}
                  disableContainer
                />
              </section>
            ))}
          </div>
        </div>
      ) : (
        <>
          {heading}
          <RichText
            data={post.content}
            converters={converters}
            className="post-body"
          />
        </>
      )}
      <Tailpiece />
      <Link
        href="/blog"
        className="text-night hover:text-gold-200 self-center text-sm font-medium transition-colors"
      >
        {t("allPosts")}
      </Link>
    </article>
  );

  if (!showContents) return article;

  // The contents open with the post's title, as in a book: it leads back
  // to the start and stays highlighted while the opening is read.
  const contents = [
    { id: "top", text: post.title, level: 2 as const },
    ...outline.items,
  ];

  // The grid's middle column keeps the text where it is without contents;
  // the timeline-scope lets the contents links read the parts' timelines.
  return (
    <div
      className="xl:grid xl:grid-cols-[1fr_minmax(0,40rem)_1fr] xl:gap-x-16"
      style={{
        timelineScope: contents.map((_, i) => sectionTimeline(i)).join(),
      }}
    >
      <PostContents
        items={contents}
        label={t("contents")}
        className="sticky top-[calc(var(--header-height)+2.5rem)] hidden max-h-[calc(100vh-var(--header-height)-5rem)] max-w-64 self-start justify-self-end overflow-y-auto xl:col-start-1 xl:row-start-1 xl:block"
      />
      {article}
      <PostContentsMenu items={contents} label={t("contents")} />
    </div>
  );
}
