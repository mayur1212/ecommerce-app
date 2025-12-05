import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../data/blogs";

export default function BlogList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {blogs.map((blog) => (
        <div 
          key={blog.id} 
          className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
        >
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="rounded-lg mb-4 w-full h-48 object-cover" 
          />
          
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-600 mt-2">{blog.description}</p>

          <Link 
            to={`/blog/${blog.slug}`}
            className="text-blue-600 font-semibold block mt-3"
          >
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
}
