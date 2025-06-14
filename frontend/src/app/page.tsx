import { client } from "@/lib/sanity";
import { aakashPostsQuery } from "@/lib/queries";
import { format } from "date-fns";
import Link from "next/link";

export const revalidate = 60; // ISR every 60 seconds

type Post = {
  _id: string;
  title: string;
  author: string;
  slug: { current: string };
  publishedAt: string;
};

export default async function HomePage() {
  const posts: Post[] = await client.fetch(aakashPostsQuery);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">📈 Aakash's Quant Journals</h1>

      {posts.length === 0 && (
        <p className="text-gray-400">No posts yet. Come back tomorrow 🙂</p>
      )}

      <ul className="space-y-6">
        {posts.map((post) => {
          if (!post.slug?.current) return null;

          return (
            <li key={post._id} className="border-b border-gray-800 pb-4">
              <Link href={`/post/${post.slug.current}`}>
                <h2 className="text-xl font-semibold text-blue-400 hover:underline">
                  {post.title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
