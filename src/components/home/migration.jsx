import React from 'react';
import Nav from "react-bootstrap/Nav";
import { useLocation } from 'react-router-dom';

export const Jumbotron = (props) => {
  const bgStyle = props.style ?? { backgroundColor: "#e9ecef" };
  return (
    <div id={props.id} className={`py-3 ${props.className}`} style={bgStyle}>
      <div className="container py-5">
        {props.children}
      </div>
    </div>
  );
}

export const NavLink = (props) => {
  return (
    <Nav.Link
      href={props.href}
      target={props.target}
      rel={props.rel}
      className={`nav-link ${props.activeClassName}`}
    >
      <span className={`nav-item lead ${props.className}`}>
        {props.children}
      </span>
    </Nav.Link>
  );
}

export const StyledNavLink = (props) => {
  const location = useLocation(); 
  
  // location could contains properties like:
  // 1) pathname:"/" and hash:"#projects"
  // 2) pathname:"/blog" and hash:""
  const activeClassName = (location.pathname === props.pathName || location.pathname + location.hash === props.pathName ) ? "active" : "";
  const href = process.env.PUBLIC_URL + props.pathName;

  return (
    <NavLink 
      activeClassName={activeClassName}
      href={href}
    >
      {props.linkName}
    </NavLink>
  );
}
