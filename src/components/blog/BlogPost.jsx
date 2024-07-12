import React from "react";
import bloglist from "../../editable-stuff/blog";
import { useLocation } from "react-router-dom"

const BlogPost = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const post = bloglist[id];

  return (
    <div className="container-lg mt-5">
      {post && (
        <div>
          <h1 className="display-2 text-center">{post.title}</h1>
          <img className="img-fluid mb-2" 
            src={post.previewImage.src} 
            width={post.previewImage.imageSize.width} 
            height={post.previewImage.imageSize.height} 
            alt={post.title} />
          {post.getBlog()}
        </div>
      )}
      {!post && <h1 className="display-1 text-center">404 - Page not found</h1>}
    </div>
  );
};

export default BlogPost;
