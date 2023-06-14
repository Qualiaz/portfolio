import { createContext, useEffect, useState } from "react";
import svgCurveUnderline from "../assets/curve-underline.svg";
import svgDropDown from "../assets/drop-down.svg";
import { motion, AnimatePresence } from "framer-motion";
import asd from "../assets/asd.gif";
import typescriptSvg from "../assets/typescript.svg";
import scssSvg from "../assets/scss.svg";
import Project from "../components/Project";

export const ActiveProjectContext = createContext();
const ActiveProjectProvider = ({ children }) => {
  const [activeProject, setActiveProject] = useState(null);

  const handleSetActiveProject = (projectName) => {
    if (activeProject === projectName) {
      setActiveProject(null);
    } else {
      setActiveProject(projectName);
    }
  };

  return (
    <ActiveProjectContext.Provider
      value={{ activeProject, onSetActive: handleSetActiveProject }}
    >
      {children}
    </ActiveProjectContext.Provider>
  );
};

const Projects = () => {
  return (
    <div className="projects flex flex-col m-2 gap-6">
      <div className="relative flex flex-col m-2 ">
        <span className="text-white font-bold text-2xl ml-2">Projects</span>
        <img
          className="absolute w-28 top-5 -z-10"
          src={svgCurveUnderline}
          alt=""
        />
      </div>
      <div className="flex flex-col m-2 gap-2">
        <ActiveProjectProvider>
          <Project name="Traveler 2048" imgSrc={asd} />
          <Project name="Gamify Todo" imgSrc={asd} />
          <Project name="Accessibility module" imgSrc={asd} />
        </ActiveProjectProvider>
      </div>
    </div>
  );
};

export default Projects;
