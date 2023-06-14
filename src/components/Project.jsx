import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import svgDropDown from "../assets/drop-down.svg";
import asd from "../assets/asd.gif";
import { ActiveProjectContext } from "../pages/Projects";

const Project = ({ name, imgSrc }) => {
  //   const [isDropdown, setIsDropdown] = useState(false);
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
    <div className="flex flex-col ">
      <div
        className={`flex items-center justify-between p-2 w-full h-10 bg-lgrey ${roundedClass}`}
      >
        <span className="font-bold text-white">{name}</span>
        <motion.img
          className="w-6 hover:cursor-pointer"
          src={svgDropDown}
          alt=""
          //   onClick={() => setIsDropdown(!isDropdown)}
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
                    <button className="bg-orange text-white font-bold p-3 rounded-md">
                      Stack
                    </button>
                    <button className="bg-orange text-white font-bold p-3 rounded-md">
                      Website
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-2 mb-2 overflow-scroll">
                  <motion.p className="">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis est delectus nihil totam nisi assumenda aspernatur
                    ea ut sint cumque, quo ratione cum ad sed commodi? Aut
                    obcaecati nobis cumque eos quasi similique porro nulla,
                    dolor omnis rerum sapiente voluptates alias qui quas dolores
                    facilis tempora voluptatem sint reiciendis? Est, tempora
                    fuga soluta iste commodi error accusantium quam recusandae
                    expedita inventore molestiae. Repudiandae iusto eum eius
                    aliquam at consequuntur ad inventore quisquam optio? Sed,
                    ullam deleniti excepturi, vel harum deserunt minima ratione
                    neque suscipit id debitis quibusdam totam veritatis iste
                    iusto, eveniet temporibus soluta. Suscipit consequatur error
                    id expedita placeat.
                  </motion.p>
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
