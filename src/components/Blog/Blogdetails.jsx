import React from "react";
import { useParams } from "react-router-dom";
import { blogs } from "../../data/blogs";
import RelatedBlogs from "./RelatedBlog";

export default function BlogDetails() {
  const { slug } = useParams();

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <h1 className="text-center text-xl mt-10">Blog Not Found</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-5">
      <img src={blog.image} alt={blog.title} className="w-full rounded-xl" />

      <h1 className="text-3xl font-bold mt-5">{blog.title}</h1>

      <p className="text-gray-500 mt-1">
        {blog.author} • {blog.date}
      </p>

      <p className="mt-5 text-lg text-gray-700 leading-relaxed whitespace-pre-line">
        {blog.content}
      </p>

      <RelatedBlogs blogs={blogs} currentId={blog.id} />
    </div>
  );
}
