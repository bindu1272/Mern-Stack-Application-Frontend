import React from "react";
import mernImage from "../assets/images/mern.png";
import reactImage from "../assets/images/react.png";
import nodeImage from "../assets/images/node.png";
import mysqlImage from "../assets/images/mysql.png";
export default function Dashboard() {
  const courses = [
    {
      image: reactImage,
      title: "React",
      description: "This is used for building user Interface",
      latestversion: "Latest version 16+",
      color: "primary",
    },
    {
      image: nodeImage,
      title: "NodeJs",
      description: "This is used for developing Restful API's",
      latestversion: "Latest version 16+",
      color: "success",
    },
    {
      image: mysqlImage,
      title: "MySql",
      description: "This is used for storing user data",
      latestversion: "Latest version 16+",
      color: "warning",
    },
    {
      image: mernImage,
      title: "Mern Stack",
      description: "This is a combination of React,Node Js,and Mysql",
      latestversion: "Latest version 16+",
      color: "dark",
    },
  ];
  return (
    <div className="container-fluid">
      <h1 className="text-center m-2 text-warning">Welcome to VM Training</h1>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {courses.map(
          ({ image, title, description, latestversion, color }, index) => {
            return (
              <div
                class="card mb-3 m-4 container col-lg-2 col-md-12 col-sm-12 col-xs-12"
                key={index}
              >
                <img
                  src={image}
                  class="card-img-top mt-1 common-image"
                  alt="mern stack"
                />
                <div class="card-body text-left">
                  <h5 class={`card-title bg-${color} p-2 text-white rounded`}>
                    {title}
                  </h5>
                  <p class="card-text">{description}</p>
                  <p class="card-text">
                    <small class="text-muted">{latestversion}</small>
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
