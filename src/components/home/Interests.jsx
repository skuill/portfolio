import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Jumbotron } from "./migration";
import RotatingIcons from "../RotatingIcons/RotatingIcons.jsx";

const Interests = ({ heading, message, img, imageSize }) => {
  return (
    <Jumbotron id="interests" className="bg-light m-0">
      <h2 className="display-4 pb-5 text-center">{heading}</h2>
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="row align-content-center p-2">
            <p className="lead text-center font-size-lg">{message}</p>
          </div>
          <div className="row align-self-stretch p-2 d-flex justify-content-center align-items-center">
              <RotatingIcons />
          </div>
        </div>
        <div className="col-lg-7">
          <Carousel className="p-2">
            {img.map((value, indexInterest) => {
              return (
                <Carousel.Item key={indexInterest} interval={2000} className="justify-content-center">
                  <img
                    className="d-block w-100 img-object-fit "
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
                        ? value.links.map((link, indexLink) => (
                          <a key={`interest-${indexInterest}-link-${indexLink}`} href={`${link.url}`}>{link.description}</a>
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
