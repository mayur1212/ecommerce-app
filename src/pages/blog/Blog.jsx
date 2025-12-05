// src/pages/blog/Blog.jsx
import React from "react";
import BlogList from "../../components/Blog/Bloglist";  // ✅ Correct Path

export default function Blog() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-center text-3xl font-bold mb-8">Latest Blogs</h1>
      
      {/* Blog List Component */}
      <BlogList />
    </div>
  );
}
