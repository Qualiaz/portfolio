import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const Nav = () => {
  const homeControls = useAnimation();
  const playgroundControls = useAnimation();
  const [activeMenuItem, setActiveMenuItem] = useState("Home");

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const [bgFade, setBgFade] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavVisible(window.scrollY <= scrollPos);
      setScrollPos(window.scrollY);
      setBgFade(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPos]);

  const handleHomeMouseEnter = () => {
    if (activeMenuItem !== "Home") {
      homeControls.start({
        width: "4rem",
        transition: { duration: 0.2 },
        height: "3px",
      });
    }
  };

  const handleHomeMouseLeave = () => {
    if (activeMenuItem !== "Home") {
      homeControls.start({ width: "0", transition: { duration: 0.2 } });
    }
  };

  const handlePlaygroundMouseEnter = () => {
    if (activeMenuItem !== "Playground") {
      playgroundControls.start({
        height: "3px",
        width: "6.6rem",
        transition: { duration: 0.2 },
      });
    }
  };

  const handlePlaygroundMouseLeave = () => {
    if (activeMenuItem !== "Playground") {
      playgroundControls.start({ width: "0", transition: { duration: 0.2 } });
    }
  };

  const handlePlaygroundClick = () => {
    setActiveMenuItem("Playground");
    homeControls.start({
      width: "0",
      transition: { duration: 0.2 },
    });
    homeControls.start({
      height: "2px",
      transition: { delay: 0.2, duration: 0.2 },
    });
    playgroundControls.start({
      height: "10px",
      transition: { duration: 0.2 },
    });
  };

  const handleHomeClick = () => {
    setActiveMenuItem("Home");
    playgroundControls.start({
      width: "0",
      transition: { duration: 0.2 },
    });
    playgroundControls.start({
      height: "2px",
      transition: { delay: 0.2, duration: 0.2 },
    });
    homeControls.start({ height: "10px", transition: { duration: 0.2 } });
  };

  return (
    <>
      <motion.header
        className="fixed z-40 flex flex-col justify-center items-center"
        initial={{ y: 0 }}
        animate={{ y: isNavVisible ? 0 : -100 }}
        transition={{ duration: 0.2 }}
      >
        <motion.nav
          className="text-white font-bold flex justify-center w-screen p-2 z-40"
          style={{
            backgroundColor: bgFade ? "transparent" : "#0A0A0A",
            transition: "background-color 0.3s",
          }}
        >
          <ul className="flex gap-4 p-2">
            <li className="relative">
              <Link to="/">
                <motion.div
                  animate={homeControls}
                  className="absolute top-4 -right-1 bg-orange"
                />
                <motion.button
                  onClick={handleHomeClick}
                  onMouseEnter={handleHomeMouseEnter}
                  onMouseLeave={handleHomeMouseLeave}
                  className="relative"
                >
                  Home
                </motion.button>
              </Link>
            </li>
            <li className="relative">
              <Link to="/playground">
                <motion.button
                  onClick={handlePlaygroundClick}
                  onMouseEnter={handlePlaygroundMouseEnter}
                  onMouseLeave={handlePlaygroundMouseLeave}
                >
                  Playground
                  <motion.div
                    animate={playgroundControls}
                    className="absolute top-4 -left-1 bg-rainbow -z-10"
                  />
                </motion.button>
              </Link>
            </li>
          </ul>
        </motion.nav>
        {bgFade && (
          <hr
            className={`h-1 bg-orange border-none sm:w-full ${
              activeMenuItem === "Home" ? "bg-orange" : "bg-rainbow"
            }`}
          />
        )}
      </motion.header>
    </>
  );
};

export default Nav;
