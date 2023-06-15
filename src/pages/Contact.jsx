import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import svgCurveUnderline from "../assets/curve-underline.svg";
import useAutoSizeTextArea from "../hooks/useAutosizeTextArea";
import svgSend from "../assets/send.svg";

const Contact = () => {
  const [view, setView] = useState("message"); // message or info
  const [viewMessage, setViewMessage] = useState("messageBox"); // messageBox / clientInfo / messageSent
  const [isShouldAnimate, setIsShouldAnimate] = useState(false);

  const [height, setHeight] = useState(10);
  const ref = useRef();
  const [value, setValue] = useState("");

  useAutoSizeTextArea(ref.current, value, setHeight);
  const handleChange = (e) => setValue(e.target?.value);

  useEffect(() => {
    console.log(viewMessage);
  }, [viewMessage]);

  return (
    <div className="flex flex-col m-2 gap-6">
      <div className="relative flex flex-col m-2">
        <span className="text-white font-bold text-2xl ml-2">Contact</span>
        <img
          className="absolute w-28 top-5 -z-10"
          src={svgCurveUnderline}
          alt=""
        />
      </div>
      <div className="flex justify-center relative ">
        <motion.button
          initial={{ zIndex: 2 }}
          animate={{
            y: view === "message" ? 5 : 0,
            x: 1,
            zIndex: view === "message" ? 2 : 1,
          }}
          className="flex z-10 items-center justify-center rounded-md rounded-br-none bg-white text-black w-24 h-10"
          onClick={() => {
            setView("message");
            setIsShouldAnimate(false);
            console.log(isShouldAnimate);
          }}
        >
          <div>
            <span className="font-bold text-black">Message</span>
          </div>
        </motion.button>

        <motion.button
          initial={{ zIndex: 1 }}
          animate={{
            y: view === "info" ? 5 : 0,
            x: -1,
            zIndex: view === "info" ? 2 : 1,
          }}
          className="flex  items-center justify-center rounded-md rounded-bl-none bg-orange text-black w-24 h-10"
          onClick={() => {
            setView("info");
            setIsShouldAnimate(false);
            console.log(isShouldAnimate);
          }}
        >
          <div>
            <span className="font-bold text-white">Info</span>
          </div>
        </motion.button>
      </div>
      <AnimatePresence>
        {view === "message" && (
          <motion.div
            key="view-message"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            exit={{ y: 10, opacity: 0, transition: 0.3 }}
            className="m-2"
          >
            <AnimatePresence>
              {viewMessage === "messageBox" && (
                <motion.div
                  key="message-box"
                  initial={{ x: 0, opacity: 1 }}
                  animate={
                    isShouldAnimate === true
                      ? { x: 0, opacity: 1, transition: { delay: 0.6 } }
                      : { x: 0, opacity: 1 }
                  }
                  exit={{ x: -100, opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <motion.textarea
                    ref={ref}
                    className="bg-slate-100 w-full rounded-md p-2 pr-10 focus:outline outline-orange overflow-hidden"
                    name=""
                    id=""
                    placeholder="Write something here... (name,prename and email will be asked after you send)"
                    onChange={handleChange}
                  ></motion.textarea>
                  <button
                    onClick={() => {
                      setIsShouldAnimate(true);
                      viewMessage === "messageBox"
                        ? setViewMessage("clientInfo")
                        : setViewMessage("messageSent");
                    }}
                    className="absolute bottom-2.5 right-2"
                  >
                    <img src={svgSend} alt="send message button" />
                  </button>
                </motion.div>
              )}
              {viewMessage === "clientInfo" && (
                <motion.div
                  key="client-info"
                  initial={{ x: 100, opacity: 0 }}
                  animate={
                    isShouldAnimate === true
                      ? { x: 0, opacity: 1, transition: { delay: 0.6 } }
                      : { x: 0, opacity: 1 }
                  }
                  exit={{ x: -100, opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                  }}
                  className="flex p-2 flex-col gap-2 h-48  bg-white rounded-md relative"
                >
                  <div className="flex justify-between">
                    <label className="font-bold min-w-fit w-44" htmlFor="">
                      First name *
                    </label>
                    <input className="border-b-4 border-b-orange w-full  focus:outline-none" />
                  </div>
                  <div className="flex justify-between">
                    <label className="font-bold min-w-fit w-44 " htmlFor="">
                      Last name *
                    </label>
                    <input className="border-b-4 border-b-orange w-full  focus:outline-none self-end" />
                  </div>
                  <div className="flex justify-between">
                    <label className="font-bold min-w-fit w-44" htmlFor="">
                      Email *
                    </label>
                    <input
                      required
                      className="border-b-4 border-b-orange w-full  focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-between">
                    <label className="font-bold min-w-fit w-44" htmlFor="">
                      Number
                    </label>
                    <input className="border-b-4 border-b-orange w-full focus:outline-none" />
                  </div>
                  <button
                    onClick={() => {
                      setIsShouldAnimate(true);
                      viewMessage === "messageBox"
                        ? setViewMessage("clientInfo")
                        : setViewMessage("messageSent");
                    }}
                    className="absolute bottom-2.5 right-2"
                  >
                    <img src={svgSend} alt="send message button" />
                  </button>
                </motion.div>
              )}
              {viewMessage === "messageSent" && (
                <motion.div
                  className="flex justify-center items-center p-2 flex-col gap-2 h-16 bg-white rounded-md"
                  key="message-sent"
                  initial={{ x: 100, opacity: 0 }}
                  animate={
                    isShouldAnimate === true
                      ? { x: 0, opacity: 1, transition: { delay: 0.6 } }
                      : { x: 0, opacity: 1 }
                  }
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ ease: "easeInOut" }}
                >
                  <p className="text-black font-semibold">
                    Your message has been sent! <br /> I will get back to you
                    shortly!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {view === "info" && (
          <motion.div
            key="view-info"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            exit={{ y: 10, opacity: 0, transition: 0.3 }}
            className="flex flex-col justify-center h-32 bg-orange rounded-md m-2"
          >
            <span className="ml-10 font-semibold text-white">
              Robert Apostoiu
            </span>
            <span className="ml-10 font-semibold text-white">
              qualiaz@protonmail.com
            </span>
            <span className="ml-10 font-semibold text-white">
              +40 799483823
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
