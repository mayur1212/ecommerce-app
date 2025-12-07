import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "../../data/blogs";
import RelatedBlogs from "./RelatedBlog";

export default function BlogDetails() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-5 text-center">
        <h1 className="text-2xl font-bold mb-2">Blog Not Found</h1>
        <p className="text-gray-500 text-sm">
          The article you&apos;re looking for doesn&apos;t exist or was removed.
        </p>
        <Link
          to="/blog"
          className="inline-block mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const author = blog.author || "ShopNow Blog";
  const date = blog.date || "";
  const category = blog.category || "Featured";
  const readTime = blog.readTime || "5 min read";

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* Back link */}
      <Link
        to="/blog"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mb-4"
      >
        <span className="mr-1">←</span> Back to Blog
      </Link>

      {/* MAIN CARD */}
      <article className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
        {/* HERO IMAGE + OVERLAY BADGES */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="inline-flex w-fit px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-gray-800">
                {category}
              </span>
              <span className="text-xs sm:text-sm text-gray-100">
                {date} • {readTime}
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-4 sm:px-8 py-6 sm:py-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          {/* Meta row */}
          <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700 uppercase">
              {author.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{author}</span>
              <span className="text-xs">
                {date && `${date} • `}{readTime}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-6" />

          {/* Body */}
          <div className="prose max-w-none prose-sm sm:prose-base prose-p:mb-4 prose-headings:mt-6 prose-headings:mb-3 text-gray-700">
            <p className="whitespace-pre-line leading-relaxed text-[15px] sm:text-[16px]">
              {blog.content}
            </p>
          </div>
        </div>
      </article>

      {/* RELATED BLOGS */}
      <div className="mt-10">
        <RelatedBlogs blogs={blogs} currentId={blog.id} />
      </div>
    </div>
  );
}
