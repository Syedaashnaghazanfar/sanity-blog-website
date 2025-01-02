"use client";
import { createClient } from "@sanity/client";
import Navbar from "@/app/components/navbar";
import Link from "next/link";


const client = createClient({
  projectId: "7vm4pznw",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-12-01",
});

const BlogPage: React.FC = async () => {
  const query = `
     *[_type == "post"][0...10]{
    _id,
    title,
   "slugCurrent": slug.current,
    author,
    body,
    "mainImageUrl": mainImage.asset->url
  }
    `;
  type Post = {
    slugCurrent: any;
    _id: string;
    title: string;
    slug: { current: string };
    author: string;
    body: any;
    mainImageUrl: string;
  };

  const posts: Post[] = await client.fetch(query); // Fetch posts using the globally defined client
  return (
    <div className="flex flex-col justify-around items-center">
      <Navbar />
      {/* blog */}
      <div className="bg-grey-50" id="blog">
        <div className="container py-16 md:py-20">
          <div className="flex justify-center mt-[30px]">
            <a
              href="/"
              className="inline-block rounded-lg bg-[#d6d4d4] px-4 py-2 text-black font-header border border-black text-lg uppercase shadow-md transition-transform transform hover:scale-105 hover:bg-primary-dark text-center"
            >
              Back to Home
            </a>
          </div>
          {/* Section Title */}
          <h2 className="text-center font-header text-4xl font-semibold mt-[50px] uppercase text-primary sm:text-5xl lg:text-6xl">
            I also like to write Blogs
          </h2>
          {/* Section Subtitle */}
          <h4 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
            Check out my latest posts!
          </h4>

          {/* Blog Posts Grid */}
          <div className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">
            {posts.map((post) => {
              return (
                <div
                  key={post._id}
                  className="rounded-lg overflow-hidden shadow-lg bg-white"
                >
                 
                    <div
                      className="relative h-48 sm:h-60 lg:h-48 xl:h-60"
                      style={{
                        backgroundImage: `url(${post?.mainImageUrl || "/default-image.jpg"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <span className="absolute inset-0 block bg-gradient-to-b from-black/30 to-black/50 opacity-20 transition-opacity group-hover:opacity-50"></span>
                      <Link
                        key={post.slugCurrent}
                        href={`/post/${post.slugCurrent}`}
                      >
                        <span className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base">
                          Read More
                        </span>
                      </Link>
                    </div>
                    <div className="py-6 px-5">
                      <span className="block font-body text-lg font-semibold text-black">
                        {post?.title || "Untitled Post"}
                      </span>
                      <span className="block pt-2 font-body text-gray-600">
                        Click read more to read my blogs
                      </span>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
