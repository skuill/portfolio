import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Jumbotron } from "./migration";

const Interests = ({ heading, message, img, imageSize }) => {
  return (
    <Jumbotron id="interests" className="bg-light m-0">
      <h2 className="display-4 pb-5 text-center">{heading}</h2>
      <div className="row">
        <div className="col-md-5">
          <p className="lead text-center font-size-lg">{message}</p>
        </div>
        <div className="col-md-7">
          <Carousel>
            {img.map((value, index) => {
              return (
                <Carousel.Item key={index} interval={2000}>
                  <img
                    className="d-block w-100 img-object-fit"
                    src={value.img}
                    alt="First slide"
                    width={imageSize.width}
                    height={imageSize.height}
                  />
                  <Carousel.Caption>
                    <div className="card shadow-sm p-1 mb-5 bg-white rounded opacity-75">
                      <h3>{value.label}</h3>
                      <p className="my-1">
                        {value.paragraph}
                      </p>
                      { value.links.length 
                        ? value.links.map((link, index) => (
                          <a href={`${link.url}`}>{link.description}</a>
                        ))
                        : null 
                      }
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    </Jumbotron>
  );
};

export default Interests;
