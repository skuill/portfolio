import React, { Fragment } from "react";
import Carousel from "react-bootstrap/Carousel";

class BlogBuilder {
  list = [];

  constructor({ title, previewImage, description }) {
    this.title = title;
    this.previewImage = previewImage;
    this.description = description;
  }

  addParagraph = (props) => {
    this.list.push(
      <p key={this.list.length} className="lead">
        {props}
      </p>
    );
    return this;
  };

  addHeading = (props) => {
    this.list.push(
      <Fragment key={this.list.length}>
        <h2 className="">{props}</h2>
        <hr />
      </Fragment>
    );
    return this;
  };

  addImages = (props) => {
    this.list.push(
      <Carousel key={this.list.length} data-bs-theme="dark">
      {props.images.map((value, index) => {
        return (
          <Carousel.Item key={index} >
            <img
              className="d-block img-object-fit"
              src={value.src}
              alt="First slide"
              width={props.imageSize.width}
              height={props.imageSize.height}
            />
            <Carousel.Caption>
              <h3>{value.label}</h3>
              <p>
                {value.paragraph}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
    );
    return this;
  };

  getBlog = () => {
    return <div className="container-lg">{this.list}</div>;
  };
}

export { BlogBuilder };
