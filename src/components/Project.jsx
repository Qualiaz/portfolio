import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import svgDropDown from "../assets/drop-down.svg";
import { ActiveProjectContext } from "../pages/Projects";
import Stack from "./Stack";

const Project = ({ name, imgSrc, link, description, stack }) => {
  const [roundedClass, setRoundedClass] = useState("rounded-md");
  const { activeProject, onSetActive } = useContext(ActiveProjectContext);
  const isActive = activeProject === name;

  useEffect(() => {
    if (isActive) {
      setRoundedClass("rounded-tl-md rounded-tr-md");
    } else {
      const timeoutId = setTimeout(() => {
        setRoundedClass("rounded-md");
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isActive]);

  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center justify-between p-2 h-10 bg-lgrey ${roundedClass}`}
      >
        <span className="font-bold text-white">{name}</span>
        <motion.img
          className="w-6 hover:cursor-pointer"
          src={svgDropDown}
          alt="toggle image"
          onClick={() => onSetActive(name)}
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-lgrey rounded-bl-md rounded-br-md overflow-hidden"
          >
            <div className="h-96">
              <hr className="border-b-2 border-orange m-2" />

              <section className="flex p-2 pb-5 gap-4 h-full">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-5/6">
                    <img
                      className="rounded-sm object-cover w-full h-full"
                      src={imgSrc}
                      alt=""
                    />
                  </div>
                  <div className="flex gap-2">
                    <Stack stack={stack} />
                    <button className="bg-orange text-white font-bold p-3 rounded-md">
                      <a href={link}>website</a>
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-2 mb-2 overflow-scroll">
                  <motion.p className="">{description}</motion.p>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Project;
