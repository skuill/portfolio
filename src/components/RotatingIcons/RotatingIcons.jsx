import React from "react";
import { GiMountains, GiForestCamp, GiPhotoCamera, GiGuitar, GiCycling, GiSpellBook } from "react-icons/gi";
import "./RotatingIcons.scss";

const iconComponents = [
  <GiCycling />,
  <GiGuitar />,
  <GiForestCamp />,
  <GiMountains />,
  <GiPhotoCamera />,
  <GiSpellBook />,
];

const RotatingIcons = () => {
  return (
    <div className="rotating-icons-container">
      <div className="rotating-icons">
        {iconComponents.map((Icon, index) => {
          const angle = index * (360 / iconComponents.length); // angle for current icon
          return (
            <div
              key={index}
              className="icon-container"
              style={{
                transform: `rotate(${angle}deg) translate(-50%, -100px) rotate(-${angle}deg)` // rotate container and icon
              }}
            >
              <div className="icon">
                {Icon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RotatingIcons;
