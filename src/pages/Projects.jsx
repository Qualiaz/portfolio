import { createContext, useState } from "react";
import svgCurveUnderline from "../assets/curve-underline.svg";
import pngTraveler2048 from "../assets/asd.gif";
import pngGamifyTodo from "../assets/gamify-todo.png";
import pngAccessiblity from "../assets/accessibility.png";
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

const traveler2048Description =
  "We all know the 2048 game. It's similar to that but with a few caveats. You can revert the board state one step back if you have a traveler point, which you might get when you make a move. The game can also spawn 2 special blocks, a joker or a genius, which will basically divide or respectively multiply by 2 the first block it will merge with. Worked on this for a few days, mostly just to practice Typescript.";
const gamifyTodoDescription =
  "My first big project, is not only a TODO app, it is a gamification app that also has habits, time tracking for individual tasks, journaling and year in pixel calendar. made with vanilla JS and very few packages (I wanted to do a lot of it myself), probably about 10k lines of code, I worked on this for a few months. While I worked on it I learned quite a lot and with time and experience, it became a quite a bad developing experience for me, so the app is not really finished and the code is quite a mess, but it is an idea I would like to explore more in depth later.";
const accessibilityApp =
  "This was made for a client, one module, one class, 2k lines of code made in 3 weeks. Maybe having one class was a bad idea, but I loved it! Although the website was quickly made in React, the module is made with vanilla, I might change it to jquery from the DOM Api. Some features will not show up on mobile, because they would be useless, and there is a browser compatibility issue with zooming content in firefox";

const Projects = () => {
  return (
    <div className="projects flex flex-col m-2 gap-6 ">
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
          <Project
            name="Traveler 2048"
            imgSrc={pngTraveler2048}
            link="https://traveler-2048.vercel.app/"
            description={traveler2048Description}
            stack="typescript, scss"
          />
          <Project
            name="Gamify Todo"
            imgSrc={pngGamifyTodo}
            link="https://gamify-todo-e8896.firebaseapp.com/auth.html"
            description={gamifyTodoDescription}
            stack="html, scss, javascript, firebase"
          />
          <Project
            name="Accessibility module"
            imgSrc={pngAccessiblity}
            link="https://web-accessibility-six.vercel.app/"
            description={accessibilityApp}
            stack="react, javascript, css"
          />
        </ActiveProjectProvider>
      </div>
    </div>
  );
};

export default Projects;
