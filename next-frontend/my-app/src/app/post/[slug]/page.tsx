import Comments from "@/app/components/comments";
import Navbar from "@/app/components/navbar";
import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react";

const client = createClient({
  projectId: "7vm4pznw",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-12-01", // Correct API version
});

export default async function PostPage({
   params,
}: {
  params: { slug: string };
}) {
  // You can directly access the `slug` as it's available synchronously in Next.js 15
  const { slug } = params;
  const query = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "authorName": author->name,
    "authorImage": author->imageUrl,
    body,
    publishedAt,
  }
`;

  const post = await client.fetch(query, { slug });
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <>
      <Navbar />
      <div id="main" className="relative bg-[#928f8f]">
        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6 md:p-10">
            {/* Post Header */}
            <div className="text-center">
              <h1 className="font-body text-3xl font-semibold text-primary sm:text-4xl md:text-5xl xl:text-6xl">
                {post.title}
              </h1>
            </div>

            {/* Author Section */}
            <div className="flex flex-col items-center justify-center pt-8 md:pt-10 md:flex-row">
              <div className="flex-shrink-0">
                <img
                  src="/assets/img/me.jpg" // Replace with post.author image if available
                  className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-md"
                  alt="Author"
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-5 text-center md:text-left">
                <span className="block font-body text-xl font-bold text-gray-700">
                  By {post.authorName || "Ashna Ghazanfar"}
                </span>
                <span className="block pt-1 font-body text-xl text-gray-500">
                  Published on:{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Post Body */}
            <div className="prose prose-lg max-w-none pt-10 text-justify">
              <PortableText value={post.body} />
            </div>
          </div>
        </div>
      </div>

      <Comments />
      <div className="bg-black">
        <div className="container py-6 flex justify-center">
          <p className="text-center font-body text-white">
            © Copyright 2024. All rights reserved, Ashna Ghazanfar.
          </p>
        </div>
      </div>
    </>
  );
}
