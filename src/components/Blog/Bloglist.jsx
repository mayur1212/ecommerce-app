import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../data/blogs";

export default function BlogList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      {blogs.map((blog) => {
        const category = blog.category || "Featured";
        const date = blog.date || "Just now";

        return (
          <article
            key={blog.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-blue-500 hover:-translate-y-1"
          >
            {/* IMAGE + BADGES */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* top-left category chip */}
              <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-gray-800">
                {category}
              </span>

              {/* bottom-left date */}
              <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[11px] rounded-full bg-black/60 text-white">
                {date}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                {blog.title}
              </h2>

              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {blog.description}
              </p>

              {/* footer row */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>{blog.author || "ShopNow Blog"}</span>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:text-blue-700"
                >
                  Read More
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
