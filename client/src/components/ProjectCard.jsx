import React from "react";

function ProjectCard({ project }) {
  return (
    <div className="projectCard w-[54vh] h-[54vh] overflow-hidden cursor-pointer shadow-sm my-5">
      <img src={project.img} alt="" className="w-full h-[70%] object-cover" />
      <div className="info flex items-center gap-[20px] p-[15px]">
        <img src={project.pp} alt="" className="w-[40px] h-[40px] rounded-[50%] object-cover" />
        <div className="texts">
          <h2 className="text-[14px] font-medium">{project.cat}</h2>
          <span className="text-[14px] font-light">{project.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
