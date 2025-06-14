import { client } from "@/lib/sanity";
import { communityPostsQuery } from "@/lib/queries";
import { format } from "date-fns";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  author: string;
  slug: { current: string }
  publishedAt: string;
};

export const revalidate = 60;

export default async function CommunityPage() {
  const posts: Post[] = await client.fetch(communityPostsQuery);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">🧑‍🤝‍🧑 Community Posts</h1>

      {posts.length === 0 && (
        <p className="text-gray-500">No community blogs yet. Be the first at /write!</p>
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
