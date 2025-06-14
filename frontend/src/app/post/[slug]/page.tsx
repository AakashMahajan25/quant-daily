import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns";

/**
 * PageProps for PostPage, matching Next.js generated type.
 */
interface PageProps {
  params?: Promise<{ slug: string }>;
}

const query = `*[_type == "post" && slug.current == $slug][0]{
  title, author, publishedAt, body
}`;

export default async function PostPage({ params }: PageProps) {
  const { slug } = params ? await params : {};
  if (!slug) return <div className="p-6">Invalid post slug.</div>;

  const post = await client.fetch(query, { slug });

  if (!post) return <div className="p-6">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {post.author} on {format(new Date(post.publishedAt), "dd MMM yyyy")}
      </p>
      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} />
      </div>
    </div>
  );
}
