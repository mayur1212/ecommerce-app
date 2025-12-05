import React from "react";
import { Link } from "react-router-dom";

export default function RelatedBlogs({ blogs, currentId }) {
  const related = blogs.filter((b) => b.id !== currentId).slice(0, 3);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Related Blogs</h2>

      <div className="grid md:grid-cols-3 gap-5">
        {related.map((blog) => (
          <Link key={blog.id} to={`/blog/${blog.slug}`}>
            <div className="p-3 rounded-xl border hover:bg-gray-50 transition">
              <img src={blog.image} className="w-full h-32 rounded-lg object-cover" />
              <h3 className="font-semibold mt-2">{blog.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
