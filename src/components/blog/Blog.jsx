import React from "react";
import { BlogBuilder } from "./BlogBuilder";
import bloglist from "../../editable-stuff/blog";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

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
    <Card className="m-5">
      <div style={{textAlign: 'left'}}>
        <Card.Img
          variant="top"
          className="card-img-top d-flex flex-row"
          src={previewImage.src}
          width={previewImage.imageSize.width}
          height={previewImage.imageSize.height}
        />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Link className="btn btn-outline-secondary btn-lg " to={{
          pathname: `/blog/${index}`,
          state: { id: index },
        }}>
          Read more..
        </Link>
      </Card.Body>
    </Card>
  );
};

export { Blog, BlogBuilder };
