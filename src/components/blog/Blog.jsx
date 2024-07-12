import React from "react";
import { BlogBuilder } from "./BlogBuilder";
import bloglist from "../../editable-stuff/blog";
import { Link } from "react-router-dom";
const Blog = (props) => {
  return (
    <div className="pt-5 m-0 bg-light"> 
      <h1 className="text-center pt-2">Blogs</h1>
      {bloglist.map((value, index) => {
        return (
          <BlogCard
            key={index}
            title={value.title}
            description={value.description}
            previewImage={value.previewImage}
            index={index}
          />
        );
      })}
    </div>
  );
};

const BlogCard = ({ index, title, previewImage, description }) => {
  return (
    <div className="m-5">
      <div className="">
        <div className="row">
          <div className="col-8 col-lg-12">
            <div className="">
              <h2 className="">{title}</h2>
              <img src={previewImage.src} 
                className="img-fluid" 
                alt="..." 
                width={previewImage.imageSize.width}
                height={previewImage.imageSize.height}/>
              <p className="lead">{description}</p>
              <Link className="btn btn-outline-secondary btn-lg " to={{
                pathname: `/blog/${index}`,
                state: { id: index },
              }}>
                Read more...{" "}
              </Link>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export { Blog, BlogBuilder };
